const tasksService = require('./tasks.service');


const envoyerErreur = (res, error) => {
  const status = error.name === 'ValidationError' ? 400 : error.status || 500;
  res.status(status).json({ message: error.message });
};

// POST /api/projects/:projectId/tasks
const create = async (req, res) => {
  try {
    const tache = await tasksService.creerTache(req.params.projectId, req.body || {});
    res.status(201).json({ message: 'Tâche créée avec succès', res: tache });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

// GET /api/projects/:projectId/tasks
const list = async (req, res) => {
  try {
    const taches = await tasksService.listerTaches(req.params.projectId, req.user);
    res.status(200).json({ message: 'Liste des tâches', res: taches });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

module.exports = { create, list };