const Project = require('./project.model');
const httpError = require('../utils/httpError');

const creerProjet = async (donnees, userId) => {
  const { nom, description, statut } = donnees;
  if (!nom) {
    throw httpError(400, 'Le nom du projet est obligatoire');
  }

  return Project.create({ nom, description, statut, proprietaire: userId });
};

module.exports = { creerProjet };
