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
    const nome = req.query.nome;
    const ingredientes = req.query.ingredientes;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agradecimentos</title>
            <link rel="stylesheet" href="/css/thanks.css">
        </head>
        <body>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Lanches</a></li>
                        <li><a href="/contato">Contato</a></li>
                    </ul>
                </nav>
            </header>
            <div class="thanks-container">
                <h1>Agradecemos sua sugestão!</h1>
                <p>Ela foi recebida com sucesso.</p>
                <div>
                    <p><strong>Nome do lanche:</strong> ${nome ? nome : ''}</p>
                    <p><strong>Ingredientes:</strong> ${ingredientes ? ingredientes : ''}</p>
                </div>
            </div>
        </body>
        </html>
    `);
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
    const { nome, email, mensagem, assunto } = req.body;
    res.redirect(302, `/contato-recebido?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&mensagem=${encodeURIComponent(mensagem)}&assunto=${encodeURIComponent(assunto)}`);
});


app.get('/contato-recebido', (req, res) => {
    const { nome, email, mensagem, assunto } = req.query;
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recebimento de Contato</title>
            <link rel="stylesheet" href="/css/contactThanks.css">
        </head>
        <body>
            <Header>
                <nav>
                    <ul>
                        <li><a href="/">Lanches</a></li>
                        <li><a href="/contato">Contato</a></li>
                    </ul>
                </nav>
            </Header>
            <div class="thanks-container">
                <h1>Agradecemos seu contato!</h1>
                <p><b>Nome</b>: ${nome}</p>
                <p><b>Email</b>: ${email}</p>
                <p><b>Assunto</b>: ${assunto}</p>
                <p><b>Mensagem</b>: ${mensagem}</p>
            </div>
        </body>
        </html>
    `);
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