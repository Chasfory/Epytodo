const express = require('express');
const path = require('path'); //pour donner le chemin des fichiers , pas obligatoire 
const bodyParser = require("body-parser"); //pour analyser le contenue du form 
const session = require("express-session");
const { v4: uuidv4 } = require("uuid"); //generateur d'une chaine de caractère secrete 
const router = require('./router');
const { use } = require('./router');

const app = express();
const port = process.env.PORT || 3000;

//les deuc contenues exigés 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//initialisation du view engine ( moteur de bue par défaut) -- home route 
app.set('view engine', 'ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public'))) //chemin virtuel - pour dire au serveur d'utiliser le fichier css
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))) //chemin vers le dossier asset 


app.use(session({
    secret: uuidv4(),  //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// home route
app.get('/', (req, res) =>{
    res.render('base', { title : "Login System"});
})

//demarrage du serveur 
app.listen(port, ()=>{ console.log("Lostening to the server on http://localhost:3000")});

