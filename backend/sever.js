const express = require("express")
const app = express()
const mongoose = require("mongoose")
const history = require("connect-history-api-fallback")
const path = require('path')

require('dotenv').config();


 const routeSite = require("./router/mainRoute")


//***************************************
// CONNECTION A MONGO ATLAS   ***********
//***************************************

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@clustermonkeyschool.cmsiu.mongodb.net/monkey-message?retryWrites=true&w=majority`,
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.l6svl.mongodb.net/planning?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB réussie !')
  })
  .catch(() => console.log('Connexion à MongoDB échouée et oui c est la merde !'));


app.use((req, res, next) => {                              
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//***************************************
// PARSE DU BODY REQUEST   **************
//***************************************

//  app.use(bodyParser.json())  body-parser est déprécié utiliser les 2 lignes suivantes---
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//***************************************
// ECOUTE   *****************************
//***************************************
let port = process.env.PORT;
if (port == null || port == "") {
  port = 2000;
}
app.listen(port,()=>console.log("serveur écoute sur le port : " + port));

// dossier servie sur le serveur ... dirname me semble qu'il sert tous les dossiers du serveur... pas sur mais je crois 
app.use(express.static(__dirname))


//***************************************
// ROUTES UTILISES  *********************
//***************************************


// app.use(express.static(__dirname + "/public_html"));
// app.use(express.static(path.join(__dirname, '..', 'public_html'))); 
// app.use("/images",express.static(path.join(__dirname,"images")))


app.use("/", routeSite)
// app.use("/", routeSite)


app.use(history({
  disableDotRule: true,  // pour le reload !!! important de servir le dossier static avant ce middleware et après !!!!!!!
  verbose: true
}));

 app.use(express.static(path.join(__dirname, '..', 'public_html'))); 








