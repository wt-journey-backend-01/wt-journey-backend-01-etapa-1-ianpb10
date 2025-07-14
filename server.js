const express   = require('express');
const path      = require('path');
const app       = express();
const PORT      = 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));


let nome         = null;
let ingredientes = null; 


app.get('/', (req, res) => {

    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));

});


app.get('/sugestao', (req, res) => {

    nome = req.query.nome;
    ingredientes = req.query.ingredientes;

    res.status(200).sendFile(path.join(__dirname, 'views', 'thanks.html'));

});


app.post('/home', (req, res) => {

    nome = req.body.nome;
    ingredientes = req.body.ingredientes;
    res.status(302).redirect(`/sugestao?nome=${nome}&ingredientes=${ingredientes}`);

});


app.get('/contato', (req, res) => {

    res.status(200).sendFile(path.join(__dirname, 'views', 'contact.html'));

});


app.post('/contato', (req, res) => {

    const { nome, email, mensagem } = req.body;

    res.sendFile(path.join(__dirname, 'views', 'contactThanks.html'));


});


app.get('/api/lanches', (req, res) => {

    const lanches = require("./public/data/lanches.json");

    res.status(200).json(lanches);

});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(PORT, () => {

    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
    
});