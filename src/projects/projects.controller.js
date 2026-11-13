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

module.exports = { create };