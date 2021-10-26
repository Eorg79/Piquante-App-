const mongoose =require("mongoose");

const User = mongoose.model(
    "piiquante-api",
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    "users"
);

module.exports = { User };