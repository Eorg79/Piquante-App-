// importation du module moongose
const mongoose =require('mongoose');

//définition d'un schéma mongoose pour les sauces
const sauceSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
            },
        name: {
            type: String,
            required: true
            },
        manufacturer: {
            type: String,
            required: true
            },
        description: {
            type: String,
            required: true
            },
        mainPepper: {
            type: String,
            required: true
            },
        imageUrl: {
            type: String,
            required: true
            },
        heat: {
            type: Number,
            //nombre entre 1 et 10 décrivant la sauce
            required: true
            },
        likes: {
            type: Number,
            default: 0
            },
        dislikes: {
            type: Number,
            default: 0
            },
        usersLiked: [{
            type: String,
            default: [] 
            }],
        usersDisliked: [{
            type: String,
            default: [] 
            }],
    },

);
//exportation d'un model mongoose pour les sauces, pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = mongoose.model('Sauce', sauceSchema);