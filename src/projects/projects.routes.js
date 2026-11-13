const express = require('express');
const projectsController = require('./projects.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth);//proteger bil token 

router.post('/', projectsController.create);

module.exports = router;