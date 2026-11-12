//relier l’URL au contrôleur
const express = require('express');
const authController = require('./auth.controller');

const router = express.Router();//méthode min Express tsm7lk t3ml Router msta9l y3ni ensemble mt3 routes khassa b part mou3ayna mil app 
// y3ni kima tw il auth.routes.js ms2oula 3al routes mt3 l'authentification 
router.post('/register', authController.register);

module.exports = router;
