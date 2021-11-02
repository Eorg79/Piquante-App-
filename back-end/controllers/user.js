// importation du module bcrypt, pour hacher le mot de passe
const bcrypt = require('bcrypt');

// importation du module Json Web Token, pour générer un token d'identification
const jwt = require('jsonwebtoken');

// importation du module crypto js, pour crypter les emails des utilisateurs inscrits
const cryptojs = require('crypto-js');

// importation du model mongoose Users 
const User = require('../models/Users');

// exportation d'une fonction asynchrone de creation d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  // cryptage de l'email récupéré dans la requête, avec une clé secrete stockée dans une variable d'environnement
    const Email = cryptojs.HmacSHA512(req.body.email, `${process.env.MAIL_KEY}`).toString();
    // hachage et salage 10 fois du MDP récupéré dans la requête
    bcrypt.hash(req.body.password, 10)
    // une fois la promesse résolue (email crypté et MDP haché) , création d'une nouvelle instance du model user, seuls email crypté et MDP haché seront enregistrés  
      .then(hash => {
        const user = new User({
          email: Email,
          password: hash
        });
        // enregistrement du user dans la BD MongoDB, grace à la méthode save
        user.save()
          // une fois la promesse résolue (utilisateur créé), retourne code et message de confirmation
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          // retourne une erreur si problème dans la création ou enregistrement user
          .catch(error => res.status(400).json({ error }));
      })
      // retourne une erreur si problème à l'étape du cryptage ou du hachage
      .catch(error => res.status(500).json({ error }));
  };

// exportation d'une fonction asynchrone de login d'un utilisateur inscrit
  exports.login = (req, res, next) => {
    // cryptage de l'email récupéré dans la requête, avec la même clé secrete que celle utilisée pour la création des users
    const ResearchedEmail = cryptojs.HmacSHA512(req.body.email, `${process.env.MAIL_KEY}`).toString();
    // recherche de cet email parmi les emails cryptés présents dans la BD
    User.findOne({ email: ResearchedEmail })
    // une fois la promesse résolue (recherche du user par son email dans la BD effectuée)
      .then(user => {
        // retourne erreur et message si user n'exixte pas dans la BD
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //crypte et compare le password de la requete avec le password crypté de l'user trouvé
        bcrypt.compare(req.body.password, user.password)
         // une fois la promesse résolue (user trouvé et MDP comparé)
          .then(valid => {
            // si le MDP ne match pas, retourne erreur et message
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            //si MDP OK, renvoi d'un user Id encodé grace au module JWT
            res.status(200).json({
              userId: user._id,
              //appel de la fonction sign, pour générer le token à partir du user id de la response
              token: jwt.sign(
                // données à encoder
                { userId: user._id },
                // clé secrete d'encodage
                `${process.env.JWT_USER_KEY}`,
                // durée de validité du token
                { expiresIn: '8h' }
              )
            });
          })
          // retoune une erreur si echec lors du cryptage ou de la comparaison du MDP avec celui de la BD
          .catch(error => res.status(500).json({ error }));
      })
      // retoune une erreur si echec lors de la recherche du user par son email dans la BD
      .catch(error => res.status(500).json({ error }));
  };