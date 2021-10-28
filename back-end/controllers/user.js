const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const cryptoJs = require('cryto-js');
const User = require('../models/Users');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  /*
  DANS ton controller tu importes crypto-js après l'avoir installé avec npm bien sur.

  Pour chiffrer l'email dans la base de donnée :
//chiffrer l'email dans la base de donnée (dans signup)
const emailCryptoJs = cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString();

//pour déchiffrer le mail après l'avoir cherché dans mongoDB
const emailCryptoJs = cryptojs.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_RANDOM_SECRET_KEY}`).toString();

Le HmacSHA512 c'est l'ago de chriffrement , ça serait le meilleur.
*/