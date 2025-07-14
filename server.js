const express = require('express');
const path    = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));


let name         = null;
let ingredients = null; 

app.post('/home', (req, res) => {

    name        = req.body.name;
    ingredients = req.body.ingredients;  
    
    res.redirect(`/sugestao?nome=${name}&ingredientes=${ingredients}`)

});


app.post('/sugestao', (req, res) =>{

    name        = req.query.nome;
    ingredients = req.query.ingredientes;

    res.redirect('/thanks')



})

app.get('/thanks', (req, res) =>{

    res.send(`o nome da sugestao é ${name}, e os ingredientes são ${ingredients}`);

})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});