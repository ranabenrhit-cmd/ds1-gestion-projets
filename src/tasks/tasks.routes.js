const express = require('express');
const tasksController = require('./tasks.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/projects/:projectId/tasks', auth, tasksController.create);
router.get('/projects/:projectId/tasks', auth, tasksController.list);

module.exports = router;