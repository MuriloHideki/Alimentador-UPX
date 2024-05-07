const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const feederRoutes = require('./routes/feederRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb://localhost:27017/nodejs-crud-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB com sucesso!');
});

app.use('/', feederRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
