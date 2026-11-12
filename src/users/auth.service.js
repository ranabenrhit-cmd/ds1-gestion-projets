//la logique : verification , cryptage , enregistrement 

const bcrypt = require('bcryptjs'); //bib pour hashage 
const User = require('./user.model');//n3aytou lil model mtna illy 3mlneh
const httpError = require('../utils/httpError');

const inscrire = async (donnees) => {
//async khtr lzmna nstanw rsltt w bch nst3mlou await
  const { nom, login, password, role } = donnees;
  //3ana technique in JS esmha Destructuring fi3oudh n5arjou kol haja whdha 
  // like (donnees.nom / donnees.login /..) nst5rjouhom kol w nhotou kol whd fi variable dhrba whda

   if (!nom || !login || !password) {//verification kn il nom w login w password kol non vide
    throw httpError(400, 'Le nom, le login et le mot de passe sont obligatoires');
  }

  //verfication kn il password string + atwel min 6 
  if (typeof password !== 'string' || password.length < 6) {
    throw httpError(400, 'Le mot de passe doit contenir au moins 6 caractères');
  }

  //verification kn il login mwjoud 9bal 
  const existe = await User.findOne({ login });
  if (existe) {
    throw httpError(409, 'Ce login est déjà utilisé');
  }
  
  const passwordCrypte = await bcrypt.hash(password, 10);//hashing mt3 il password 
  const user = await User.create({ nom, login, password: passwordCrypte, role });
  return {
    id: user._id,
    nom: user.nom,
    login: user.login,
    role: user.role,
    createdAt: user.createdAt,
  };
};

module.exports = { inscrire };