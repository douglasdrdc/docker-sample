# Iniciando uma aplicação Node.js com o Docker

## Com a aplicação node criada o primeiro passo é criar o Dockerfile 
    - touch Dockerfile
## No arquivo Dockerfile iremos declarar as dependencias necessarias para que nossa apicação seja executada dentro do container, como o node, redis, mongo. Onde:
    - FROM node:alpine // versão do node a ser utiizada
    - WORKDIR /usr/app // diretório onde iremos guardar os dados no container
    - COPY package*.json ./ // Copiando package.json para o diretorio /usr/app
    - RUN npm install // Instalando as dependencias detalhadas no package.json
    - COPY . . // Realizando a cópia do restante dos arquivos do projeto para o diretório usr/app, desconsiderando o que tiver no .dockerignore
    - EXPOSE 3009 // Porta definida no node (express) a ser exposta 
    - CMD ["npm", "start" ] // Deixa claro que o container deve rodar o npm start definido no package.json

## Terminada esta parte, precisamos reaizar o build do docker para a geração do container e logo após rodar o container criado, conforme abaixo:
    - docker build -t drdc/docker-sample .
    ** Onde drdc/docker-sample é o nome do container que se deseja colocar

    - docker run -p 3009:3009 -d drdc/docker-sample
    ** Onde 3009:3009 é respectivamente, a porta que o usuário irá acessar e a porta que o container está disponível.

## Para verificar se o container foi inicializado com sucesso:
    - docker ps

## Configurado o container, precisamos criar o docker-compose 
    - touch docker-compose.yml

## O docker-compose permite que toda alteração realizada na aplicação, seja automaticamente atualizada no container, onde:
    version: "3" // Versão do compose atualmente na 3
    services: // Serviços que queremos que seja atualizado
    app: // Nome da nossa aplicação (pode ser dado quauqer nome)
        build: . // Diretório onde o Dockerfile foi definido
        command: npm start // Comando a ser executado assim que a alicação subir
        ports: // Redirecionamento de portas
        - 3009:3009
        volumes: // Qual pastas quero monitorar e para qual asta devo mandar origem:destino
        - .:/usr/app
      
## Criado o docker-compose, precisamos agora instalar o nodemon que irá realizar de forma automatica todos os comandos descritos no docker-compose toda vez que um arquivo for alterado no projeto
    npm i nodemon

## E para que seja dado o gatilho para esta alteração, precisamos aterar o arquivo package.json na parte de scripts
    "start": "nodemon index.js"

## Para rodar o docker-compose é necessário utilizar o comando
    docker-compose up

## Pontos importantes
    - Caso já exista um container com o mesmo nome é necessário rodar:
        docker ps - Para pegar o id do container
        docker stop id-container
        docker rm id-container
