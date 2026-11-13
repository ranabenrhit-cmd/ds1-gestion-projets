const projectsService = require('./projects.service');

const envoyerErreur = (res, error) => {
  const status = error.name === 'ValidationError' ? 400 : error.status || 500;
  res.status(status).json({ message: error.message });
};

const create = async (req, res) => {
  try {
    const projet = await projectsService.creerProjet(req.body || {}, req.user.id);
    res.status(201).json({ message: 'Projet créé avec succès', res: projet });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//list projects
const list = async (req, res) => {
  try {
    const projets = await projectsService.listerProjets(req.user);
    res.status(200).json({ message: 'Liste des projets', res: projets });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//get a project
// GET /api/projects/:id
const getOne = async (req, res) => {
  try {
    const projet = await projectsService.chercherProjet(req.params.id, req.user);
    res.status(200).json({ message: 'Projet trouvé', res: projet });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//update a project
// PUT /api/projects/:id
const update = async (req, res) => {
  try {
    const projet = await projectsService.modifierProjet(req.params.id, req.body || {}, req.user);
    res.status(200).json({ message: 'Projet modifié', res: projet });
  } catch (error) {
    envoyerErreur(res, error);
  }
};

//delete a project 
// DELETE /api/projects/:id
const remove = async (req, res) => {
  try {
    const projet = await projectsService.supprimerProjet(req.params.id, req.user);
    res.status(200).json({ message: 'Projet supprimé', res: projet });
  } catch (error) {
    envoyerErreur(res, error);
  }
};


module.exports = { create, list, getOne, update, remove};