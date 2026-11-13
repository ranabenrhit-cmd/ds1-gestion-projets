const mongoose = require('mongoose');
const Task = require('./task.model');
const Project = require('../projects/project.model');
const projectsService = require('../projects/projects.service');
const httpError = require('../utils/httpError');

const creerTache = async (projectId, donnees) => {

    if (!mongoose.isValidObjectId(projectId)) {
    throw httpError(400, 'Identifiant de projet invalide');
  }
  const projet = await Project.findById(projectId);
  if (!projet) {
    throw httpError(404, 'Projet introuvable');
  }

  const { titre, description, statut, deadline } = donnees;


  if (!titre) {
    throw httpError(400, 'Le titre de la tâche est obligatoire');
  }


  return Task.create({ titre, description, statut, deadline, projet: projectId });
};


const listerTaches = async (projectId, user) => {

    await projectsService.trouverProjetAutorise(projectId, user);

  return Task.find({ projet: projectId }).populate('assigneA', 'nom login');
};

module.exports = { creerTache, listerTaches };