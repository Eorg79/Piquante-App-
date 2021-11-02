// importation d'express
const express = require('express');

// création d'un router express
const router = express.Router();

// importation des controllers sauce
const sauceCtrl = require('../controllers/sauce');

// importation du middleware d'authentification de l'utilisateur
const auth = require('../middleware/auth');

// importation du middleware multer, pour gérer les téléchargements de fichiers
const multer = require('../middleware/multer-config');

//création des sous chemins des sauces, montage des middlewares et des controllers
router.get('/', auth, sauceCtrl.getAllSauces);//affichage de toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce);//recherche d'une sauxe par Id
router.post('/', auth, multer, sauceCtrl.createSauce);//création d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//modification d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);//suppression d'une sauce
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);//like/dislike d'une sauce

//exportation du router pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = router;