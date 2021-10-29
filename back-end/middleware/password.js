const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();


passwordSchema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', '123']); // Blacklist these values


module.exports = (req, res, next) => {
    // Vérification du mdp choisi par rapport au schema
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
    //affichage de la liste d'erreurs de format de mdp
        return res.status(400).json({error : 'format mot de passe incorrect:'+ passwordSchema.validate('req.body.password', { list: true })})
    }
}
