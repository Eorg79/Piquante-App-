// importation de multer, packaqge de gestion de fichiers telechargés
const multer = require('multer');


// dictionnaire des extensions en fonction du type de fichier image
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//configuration du stockage des fichiers, 
//sur le disque dur, dans le dossier nommé images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // configuration du nom de fichier
  filename: (req, file, callback) => {
    //suppression des espaces dans le nom d'origine du fichier
    const name = file.originalname.split(' ').join('_');
    // creation de l'extension
    const extension = MIME_TYPES[file.mimetype];
    //ajout d'un timestamp au nom pour rendre unique
    callback(null, name + Date.now() + '.' + extension);
  }
});
//exportation de multer, avec l'objet storage, en configuration fichier image unique
module.exports = multer({storage: storage}).single('image');