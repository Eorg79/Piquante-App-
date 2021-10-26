const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

router.get('/sauces', auth, sauceCtrl.getAllThings);
router.get('/sauces/:id', auth, sauceCtrl.getOneThing);
router.post('/sauces', auth, sauceCtrl.createThing);
router.put('/sauces/:id', auth, sauceCtrl.modifyThing);
router.delete('/sauces/:id', auth, sauceCtrl.deleteThing);
router.post('/sauces/:id/like', auth, sauceCtrl.likeThing);

module.exports = router;