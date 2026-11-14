const tasksService = require('./tasks.service');


const envoyerErreur = (res, error) => {
  const status = error.name === 'ValidationError' ? 400 : error.status || 500;
  res.status(status).json({ message: error.message });
};

//Creation Task
// POST /api/projects/:projectId/tasks
const create = async (req, res) => {
  try {
    const tache = await tasksService.creerTache(req.params.projectId, req.body || {});
    res.status(201).json({ message: 'Tâche créée avec succès', res: tache });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//list tasks 
// GET /api/projects/:projectId/tasks
const list = async (req, res) => {
  try {
    const taches = await tasksService.listerTaches(req.params.projectId, req.user, req.query);
    res.status(200).json({ message: 'Liste des tâches', res: taches });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//update task
// PUT /api/tasks/:id
const update = async (req, res) => {
  try {
    const tache = await tasksService.modifierTache(req.params.id, req.body || {}, req.user);
    res.status(200).json({ message: 'Tâche modifiée', res: tache });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//delete a task
// DELETE /api/tasks/:id
const remove = async (req, res) => {
  try {
    const tache = await tasksService.supprimerTache(req.params.id, req.user);
    res.status(200).json({ message: 'Tâche supprimée', res: tache });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//assign a task to user 
// PATCH /api/tasks/:id/assign
const assign = async (req, res) => {
  try {
    const { userId } = req.body || {};
    const tache = await tasksService.affecterTache(req.params.id, userId);
    res.status(200).json({ message: 'Tâche affectée', res: tache });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

module.exports = { create, list, update, remove, assign };