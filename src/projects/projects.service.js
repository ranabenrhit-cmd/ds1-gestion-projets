const Project = require('./project.model');
const httpError = require('../utils/httpError');
const mongoose = require('mongoose');

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


//nlwjou 3al machrou3 w nverifiw idha il user 3ndou droit 3lih 
const trouverProjetAutorise = async (id, user) => {
  // nthabtou fil id 
  if (!mongoose.isValidObjectId(id)) {
    throw httpError(400, 'Identifiant de projet invalide');
  }
  const projet = await Project.findById(id);
  if (!projet) {
    throw httpError(404, 'Projet introuvable');
  }
  //lezm ykoun il owner mt3 il project wla manager
  const estProprietaire = projet.proprietaire.toString() === user.id;
  if (!estProprietaire && user.role !== 'manager') {
    throw httpError(403, 'Accès refusé : ce projet ne vous appartient pas');
  }

  return projet;
};

//recherche d'un projet 
const chercherProjet = async (id, user) => {
  const projet = await trouverProjetAutorise(id, user);
  return projet.populate('proprietaire', 'nom login');
};

//modifier un projet 
const modifierProjet = async (id, donnees, user) => {
  const projet = await trouverProjetAutorise(id, user);
  const { nom, description, statut } = donnees;

  if (nom !== undefined) projet.nom = nom;
  if (description !== undefined) projet.description = description;
  if (statut !== undefined) projet.statut = statut;

  return projet.save();
};

//delete project 
const supprimerProjet = async (id, user) => {
  const projet = await trouverProjetAutorise(id, user);
  await projet.deleteOne();
  return projet;
};



module.exports = { creerProjet, listerProjets, chercherProjet, modifierProjet, supprimerProjet, };
