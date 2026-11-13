const Project = require('./project.model');
const httpError = require('../utils/httpError');

const creerProjet = async (donnees, userId) => {
  const { nom, description, statut } = donnees;
  if (!nom) {
    throw httpError(400, 'Le nom du projet est obligatoire');
  }

  return Project.create({ nom, description, statut, proprietaire: userId });
};

const listerProjets = async (user) => {
    const filtre = user.role === 'manager' ? {} : { proprietaire: user.id };
    return Project.find(filtre).populate('proprietaire', 'nom login');
};


module.exports = { creerProjet, listerProjets };
