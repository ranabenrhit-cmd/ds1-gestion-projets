const mongoose = require('mongoose');
const Task = require('./task.model');
const Project = require('../projects/project.model');
const projectsService = require('../projects/projects.service');
const User = require('../users/user.model');
const httpError = require('../utils/httpError');

//creat Task
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

//List Tasks 
const listerTaches = async (projectId, user) => {

    await projectsService.trouverProjetAutorise(projectId, user);

  return Task.find({ projet: projectId }).populate('assigneA', 'nom login');
};

//search a task by her id w njibou m3aha her project 
const trouverTache = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw httpError(400, 'Identifiant de tâche invalide');
  }
  const tache = await Task.findById(id).populate('projet');
  if (!tache) {
    throw httpError(404, 'Tâche introuvable');
  }
  return tache;
};

//nthabtou idha il user houa il owner of the project 
const estProprietaire = (tache, user) =>
  tache.projet && tache.projet.proprietaire.toString() === user.id;

//update a task : ya il proprietaire ya il manager 
const modifierTache = async (id, donnees, user) => {
 const tache = await trouverTache(id);

 const estAssigne = tache.assigneA && tache.assigneA.toString() === user.id;
  if (!estProprietaire(tache, user) && !estAssigne && user.role !== 'manager') {
    throw httpError(403, 'Accès refusé : vous ne pouvez pas modifier cette tâche');
  }

 const { titre, description, statut, deadline } = donnees;

 //nbdlou kn il hajet illy tb3thet 
 if (titre !== undefined) tache.titre = titre;
 if (description !== undefined) tache.description = description;
 if (statut !== undefined) tache.statut = statut;
 if (deadline !== undefined) tache.deadline = deadline;

 await tache.save();

 return tache.depopulate('projet');//nrj3ou l'id brk mt3 il project m7chtnch b be9i il m3loumt 
};

// propietaire de projet ou manager 
const supprimerTache = async (id, user) => {
  const tache = await trouverTache(id);

  if (!estProprietaire(tache, user) && user.role !== 'manager') {
    throw httpError(403, 'Accès refusé : vous ne pouvez pas supprimer cette tâche');
  }

  await tache.deleteOne();
  return tache.depopulate('projet');
};

//affect task to user , only the manager ( middleware authorize houa illy ythabt)
const affecterTache = async (id, userId) => {
  const tache = await trouverTache(id);

  // نثبتو اللي المستخدم موجود
  if (!userId || !mongoose.isValidObjectId(userId)) {
    throw httpError(400, "Identifiant d'utilisateur invalide");
  }
  const utilisateur = await User.findById(userId);
  if (!utilisateur) {
    throw httpError(404, 'Utilisateur introuvable');
  }

  tache.assigneA = userId;
  await tache.save();

  // nom et login mt3 illy t3tlou il task 
  await tache.populate('assigneA', 'nom login');
  return tache.depopulate('projet');
};


module.exports = { creerTache, listerTaches, modifierTache, supprimerTache, affecterTache, };
