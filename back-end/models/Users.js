// importation du module moongose
const mongoose = require('mongoose');

// importation du module 'unique-validator', permettant de vérifier que les valeurs du schéma ne sont pas déjà présentes dans la DB
const uniqueValidator = require('mongoose-unique-validator');

//définition d'un schéma mongoose pour les users
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// application du 'unique-validator' au schéma des users 
userSchema.plugin(uniqueValidator);

//exportation d'un model mongoose pour les users, pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = mongoose.model('User', userSchema);