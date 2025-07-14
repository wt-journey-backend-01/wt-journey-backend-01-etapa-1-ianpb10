const express   = require('express');
const path      = require('path');
const app       = express();
const PORT      = 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));


let nome         = null;
let ingredientes = null; 


app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});


app.get('/sugestao', (req, res) => {

    nome = req.query.nome;
    ingredientes = req.query.ingredientes;

    res.send(`
        <h1>Obrigado pela sugestão, ${nome}!</h1>
        <p>Ingredientes: ${ingredientes}</p>
    `);

});


app.post('/home', (req, res) => {

    nome = req.body.nome;
    ingredientes = req.body.ingredientes;
    res.redirect(`/sugestao?nome=${nome}&ingredientes=${ingredientes}`);

});


app.get('/contato', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'contact.html'));

});


app.post('/contato', (req, res) => {

    const { nome, email, mensagem } = req.body;

    res.send(`
        <h1>Mensagem Recebida</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
    `);

});


app.get('/api/lanches', (req, res) => {

    const lanches = [
        { id: 1, nome: "DevBurger Clássico", ingredientes: "Pão, carne, queijo, alface" },
        { id: 2, nome: "Veggie Burger", ingredientes: "Pão integral, hambúrguer de grão de bico, tomate" },
        { id: 3, nome: "Cheddar Bacon", ingredientes: "Pão, carne, cheddar, bacon crocante" }
    ];

    res.json(lanches);

});


app.listen(PORT, () => {

    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
    
});