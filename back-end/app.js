const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

const usersRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');

//connection au cloud Mongodb Atlas
mongoose.connect(process.env.SECRET_DB,
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Echec de connexion à MongoDB !'));

const app = express();

const cors = require('cors');

app.use(helmet());
  //generation auto headers avec module cors pour ne pas être bloqué par la CORS policy
app.use(cors());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usersRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;