//importation du framework express
const express = require('express');
//importation et configuration de dotenv pour gérer les variables d'environnement
require('dotenv').config();
//importation du module helmet, pour sécuriser les headers HTTP
const helmet = require('helmet');
//importation de mongoose, pour gérer les interactions avec la base de données MongoDB
const mongoose = require('mongoose');
//importation du module path, pour gérer les chemins vers les répertoires et fichiers
const path = require('path');
//importation du module cors, pour configurer les headers
const cors = require('cors');

//importation des routers pour les sous-chemins users et sauces
const usersRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');

//activation du debugger mongoose, permet de logger les outputs dans la console
mongoose.set('debug', true);

//connection au cloud Mongodb Atlas
mongoose.connect(process.env.SECRET_DB,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Echec de connexion à MongoDB !'));

//creation application express
const app = express();

app.use(helmet());

app.use(cors());

//lancement de la fonction intégrée pour parser le JSON (conversion chaines JSON en objects JS)
app.use(express.json());

// définition chemin virtuel pour l'accès aux fichiers images statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

//création des routes principales utilisateurs et sauces, avec leurs routers de sous-chemins
app.use('/api/auth', usersRoutes);
app.use('/api/sauces', saucesRoutes);

//exportation du module de l'application express, pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = app;