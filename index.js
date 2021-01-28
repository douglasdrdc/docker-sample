const express = require('express');

const PORT = 3009;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Bom dia lindão');
});

app.listen(PORT, HOST);