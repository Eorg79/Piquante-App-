//import de mongoose
const mongoose = require('mongoose');

//connection au cloud Mongodb Atlas
mongoose.connect('mongodb+srv://openclassroomsp6:o8uU6TH33Gn3Zai6@cluster0.ca7fl.mongodb.net/piiquante-api?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Echec de connexion à MongoDB !'));
