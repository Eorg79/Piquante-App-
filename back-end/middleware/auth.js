// importation du module json webtoken, pour vérifier le token d'identification
const jwt = require('jsonwebtoken');

//exportation d'une fonction de middleware pour authentifier le user lors d'une requête
module.exports = (req, res, next) => {
  // structure try/catch pour gérer les erreurs, car plusieurs lignes qui peuvent mal s'executer
  try {
    // récupération du token dans le header, avec suppression du terme "bearer"
    const token = req.headers.authorization.split(' ')[1];
    // décodage du token avec la fonction vérify
    const decodedToken = jwt.verify(token, `${process.env.JWT_USER_KEY}`);
    // comparaison du token décodé avec l'user Id de la requête 
    const userId = decodedToken.userId;
    // renvoi d'une erreur si l'user Id de la requête et du token ne correspondent pas
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    // sinon execution du middleware suivant
    } else {
      next();
    }
    // renvoi d'une erreur si problème de récupération/décodage du token
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

