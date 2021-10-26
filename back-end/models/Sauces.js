const mongoose =require("mongoose");

const Sauce = mongoose.model(
    "piiquante-api",
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
            required: true
            },
        dislikes: {
            type: Number,
            required: true
            },
        usersLiked: {
            type: [ "String <userId>" ],
            required: true
            },
        usersDisliked: {
            type: [ "String <userId>" ],
            required: true
            },
    },
    "sauces"
);

module.exports = { Sauce };