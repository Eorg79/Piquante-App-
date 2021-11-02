//importation d'express
const express = require('express');
//importation du middleware de sécurisation du password
const password = require("../middleware/password");

// création d'un router express
const router = express.Router();

//importation des controllers user
const userCtrl = require('../controllers/user');

////création des sous chemins des users, montage des middlewares et des controllers
router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation du router pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = router;