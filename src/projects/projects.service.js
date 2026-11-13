const Project = require('./project.model');
const httpError = require('../utils/httpError');
const mongoose = require('mongoose');
const Task = require('../tasks/task.model');

//creation projet 
const creerProjet = async (donnees, userId) => {
  const { nom, description, statut } = donnees;
  if (!nom) {
    throw httpError(400, 'Le nom du projet est obligatoire');
  }

  return Project.create({ nom, description, statut, proprietaire: userId });
};

//the idea : mch ay user 3ndou ha9 ychouf il projects kol 
const listerProjets = async (user) => {
    //hna est3mlna haja esmha Ternary Operator illy hiya tari9a mokhtasra lil if/else 
        // condition ? valeurSiVrai : valeurSiFaux
        // {} njibouhom kol mn3mlouch filtre sinn njibou hasb il id mt3 il user il mwjoud tw 
    const filtre = user.role === 'manager' ? {} : { proprietaire: user.id };
    return Project.find(filtre).populate('proprietaire', 'nom login');
    //.populate(..) bch njibou biha info nom w login illy hatinehom mt3 il proprietaire khtr fi project 3ana kn l'id 
};


//nlwjou 3al machrou3 idha mwjoud w nverifiw idha il user 3ndou droit 3lih 
const trouverProjetAutorise = async (id, user) => {
  // nthabtou fil id 
  if (!mongoose.isValidObjectId(id)) {
    throw httpError(400, 'Identifiant de projet invalide');
  }
  //bch nlwjou 3al project bil id mte3ou
  const projet = await Project.findById(id);
  if (!projet) {
    throw httpError(404, 'Projet introuvable');
  }
  //nthabtou lezm ykoun il owner mt3 il project wla manager
  const estProprietaire = projet.proprietaire.toString() === user.id;
  if (!estProprietaire && user.role !== 'manager') {
    throw httpError(403, 'Accès refusé : ce projet ne vous appartient pas');
  }

  return projet;
};

//chercher projet 
const chercherProjet = async (id, user) => {
  const projet = await trouverProjetAutorise(id, user);//est3mlna il function illy 3mlneha 
  return projet.populate('proprietaire', 'nom login');
};

//modifier un projet 
const modifierProjet = async (id, donnees, user) => {
  const projet = await trouverProjetAutorise(id, user);
  const { nom, description, statut } = donnees;

  //idha ay champ tb3th feragh dnc nkhaliw il value li9dima 
  if (nom !== undefined) projet.nom = nom;
  if (description !== undefined) projet.description = description;
  if (statut !== undefined) projet.statut = statut;

  return projet.save();
};

//delete project 
const supprimerProjet = async (id, user) => {
  const projet = await trouverProjetAutorise(id, user);
   await Task.deleteMany({ projet: projet._id }); //nfskhou il tasks illy tb3inou kol
  await projet.deleteOne();
  return projet;
};



module.exports = { creerProjet, listerProjets, chercherProjet, modifierProjet, supprimerProjet, trouverProjetAutorise, };
