const express = require('express');
const tasksController = require('./tasks.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.post('/projects/:projectId/tasks', auth, tasksController.create);
router.get('/projects/:projectId/tasks', auth, tasksController.list);

router.put('/tasks/:id', auth, tasksController.update);
router.delete('/tasks/:id', auth, tasksController.remove);

router.patch('/tasks/:id/assign', auth, authorize('manager'), tasksController.assign);

module.exports = router;