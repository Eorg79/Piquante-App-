
// importation du model mongoose Sauces
const Sauce = require('../models/Sauces');

// importation du module natif de gestion de fichiers node, 
const fs = require('fs');

// exportation d'une fonction asynchrone de création d'une sauce
exports.createSauce = (req, res, next) => {
  // conversion de la chaine form-data recupérée dans la requete en objet JS
    const sauceObject = JSON.parse(req.body.sauce);
   // suppression de l'id de la requête
    delete sauceObject._id;
    // création d'une nouvelle instance du model sauce,
    const sauce = new Sauce({
      // prend les valeurs de sauceObject
      ...sauceObject,
      // prend également en valeur l'adresse du fichier image téléchargé, générée de façon dynamique (ajout HTTP//, hote serveur, sous chemin image et nom du fichier)
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // enregistrement de la sauce dans la BD MongoDB, grace à la méthode save
    sauce.save()
    // une fois la promesse résolue (sauce sauvegardée dans la BD), retourne code et message de confirmation
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    // retourne une erreur si echec dans la sauvegarde de la sauce
      .catch(error => res.status(400).json({ error }));
  };

// exportation d'une fonction asynchrone de modification d'une sauce
exports.modifySauce = (req, res, next) => {
  // teste d'abord si la requete avec les données à MAJ contient un fichier image
    const sauceObject = req.file ?
      // si true (image), affecte à sauceObject les valeurs de la chaine form-data convertie en objet JS et l'URL de l'image générée de façon dynamique
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      // si false (pas d'image), on traite simplement le body de la requête 
      } : { ...req.body };
    // MAJ de la sauce idetifiée dans la BD MongoDB, grace à la méthode updateOne, enregistrement du nouvel objet créé, en modifiant son identifiant pour match avec celui de la requête
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      // une fois la promesse résolue (sauce MAJ dans la BD), retourne code et message de confirmation
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      // retourne une erreur si echec dans la MAJ de la sauce
      .catch(error => res.status(400).json({ error }));
  };

// exportation d'une fonction asynchrone de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  // recherche par son id de la sauce à supprimer dans la DB
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        // récupération du nom du fichier image dans son URL 
        const filename = sauce.imageUrl.split('/images/')[1];
        // methode unlink de fs pour supprimer le fichier du répertoire
        fs.unlink(`images/${filename}`, () => {
        // suppression de la sauce identifiée dans la BD MongoDB, grace à la méthode deleteOne,
          Sauce.deleteOne({ _id: req.params.id })
          // une fois la promesse résolue (sauce MAJ dans la BD), retourne code et message de confirmation
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
             // retourne une erreur si echec dans la suppression de la sauce
            .catch(error => res.status(400).json({ error }));
        });
      })
      // retourne une erreur si échec dans la recherche de la sauce
      .catch(error => res.status(500).json({ error }));
  };
  
// exportation d'une fonction asynchrone d'affichage d'une sauce sélectionnée par son id
  exports.getOneSauce = (req, res, next) => {
    // récupération de la sauce dans la BD MongoDB par comparaison de son ID, grace à la méthode findOne 
    Sauce.findOne({ _id: req.params.id })
      // une fois la promesse résolue (sauce trouvée dans la BD), retourne code et message de confirmation
      .then(sauce => res.status(200).json(sauce))
      // retourne une erreur si échec dans la recherche de la sauce
      .catch(error => res.status(404).json({ error }));
  };

  // exportation d'une fonction asynchrone d'affichage de toutes les sauces
  exports.getAllSauces = (req, res, next) => {
    // recupération de toutes les sauces présentes dans la BD MongoDB, grace à la méthode find, qui retournera un array contenant toutes les instances sauce 
    Sauce.find()
      // une fois la promesse résolue (array des sauces récupéré), retourne code et message de confirmation
      .then(sauces => res.status(200).json(sauces))
      // retourne une erreur si échec dans la récupération des sauces
      .catch(error => res.status(400).json({ error }));
  };
  
  // exportation d'une fonction asynchrone de like/dislike d'une sauce
  exports.likeDislikeSauce = (req, res, next) => {
    // affectation de la valeur de l'userId de la requête à une variable
    const userId = req.body.userId;
    // affectation de la valeur du like de la requete à une variable
    const like = req.body.like;
    // affectation de la valeur du sauceId récupéré dans l'URL de la requête
    const sauceId = req.params.id;
    // récupération de la sauce dans la BD MongoDB par comparaison de son ID, grace à la méthode findOne
    Sauce.findOne({ _id: sauceId })
     // une fois la promesse résolue (sauce identifiée dans la BD)
        .then(sauce => {
            // valeurs à modifier dans la BD MongoDB
            const newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            }
            // switch testant la valeur du like
            switch (like) {
                // si c'est un like (valeur 1)
                case 1:
                    // on ajoute le userId à l'array usersLiked de la sauce
                    newValues.usersLiked.push(userId);
                    break;
                // si c'est un dislike (valeur -1)
                case -1:
                    // on ajoute le userId à l'array usersDisliked de la sauce
                    newValues.usersDisliked.push(userId);
                    break;
                // si c'est une annulation like ou dislike (valeur à 0)   
                case 0: 
                //si userId présent dans le tableau des likes, le retire du tableau des likes de la sauce (recherche index de l'élément pour appliquer méthode splice)
                    if (newValues.usersLiked.includes(userId)) {
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    // sinon le retire du tableau des dislikes de la sauce (recherche index de l'élément pour appliquer méthode splice)
                      } else {
                        const index = newValues.usersDisliked.indexOf(userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
            // extraction du nombre de likes / dislikes par renvoi de la longueur du tableau
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            // Mise à jour de la sauce dans la BD MongoDB
            Sauce.updateOne({ _id: sauceId }, newValues )
              // une fois la promesse résolue (tableau likes/dislikes de la sauce MAJ dans la BD), retourne code et message de confirmation
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
              // retourne une erreur si échec dans la MAJ du tableau likes/dislikes de la sauce dans la BD
                .catch(error => res.status(400).json({ error }))  
        })
        // si echec de l'identification de la sauce dans la BD
        .catch(error => res.status(500).json({ error }));
};
