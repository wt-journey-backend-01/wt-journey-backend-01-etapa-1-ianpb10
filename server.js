const express = require('express');
const path    = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {

});


let name         = null;
let ingredients = null; 

app.post('/sugestao', (req, res) =>{

    name        = req.query.nome;
    ingredients = req.query.ingredientes;

    res.redirect('/thanks')



})

app.get('/thanks', (req, res) =>{

    if (!name && !ingredients){
        return res.redirect('/404.html');
    }

    res.send(`o nome da sugestao é ${name}, e os ingredientes são ${ingredients}`);

})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});