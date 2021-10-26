const express = require('express');
const app = express();
const cors = require('cors');
const usersRoute = require('./routes/users');

//Middleware
  //generation auto headers avec module cors pour ne pas être bloqué par la CORS policy
app.use(cors());
  /*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/

app.use(express.json());

app.use('/api/auth', usersRoute);

/*app.post('/api/auth', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message:'réponse envoyée!'
    });
    next();
  });
*/
//fin middleware

module.exports = app;