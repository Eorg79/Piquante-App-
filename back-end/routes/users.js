const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

/*router.post('/signup', (req, res, next) => {
    const newRecord = new UsersModel({
      email: req.body.email,
      password: req.body.password
    });
    console.log(req.body);

    newRecord.save((err, docs) => {
      if (!err) res.send(docs);
      else console.log('Error creating new data : ' + err);
    });
  });*/

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;