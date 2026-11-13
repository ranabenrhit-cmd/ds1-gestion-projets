//la logique : verification , cryptage , enregistrement 

const bcrypt = require('bcryptjs'); //bib pour hashage 
const User = require('./user.model');//n3aytou lil model mtna illy 3mlneh
const httpError = require('../utils/httpError');
const jwt = require('jsonwebtoken');// n3mlou import lil biblio t3 JWT -> JSON Web Token

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


const connecter = async (donnees) => {
  const { login, password } = donnees;// nkhrjou login w password mil donnée illy b3thhom l'utilisateur 

  if (!login || !password) {
    throw httpError(400, 'Le login et le mot de passe sont obligatoires');
  }//nthbtou illy les variables non vide il zouz 

  const user = await User.findOne({ login });// nlwjou 3la il user fil database bil login mte3ou
  if (!user) {
    throw httpError(401, 'Login ou mot de passe incorrect');
  }

  const correct = await bcrypt.compare(String(password), user.password);// n3mlou verification bil compare bch n3rfou est-ce que il mdp illy b3thha il user nfsha illy 3anna hashé fil DataBase 
  if (!correct) {
    throw httpError(401, 'Login ou mot de passe incorrect');//401 -> unauthorized 
  }

  const token = jwt.sign(// methode mil jsonwebtoken bib nst3moula bch n3mlou JWT token sign bil secret key illy 3mleh 
    //3ndha 3 params 
    { id: user._id, role: user.role },//payload -> il infos illy nhebou nhotouhom fi wst il token dans notre cas houma l'id khtr il middleware minouhk tehtej t3rf chkoun il user + il role ( user / manager ) bch t3rf salahiyet mte3ou 
    process.env.JWT_SECRET, //il key mt3na fil fichier .env
    { expiresIn: '1d' }// modet salahiyet il token lhna hattina 1d y3ni 1 day-> 24h b3dha lzm l'utilisateur y3wd y3ml login 
  );

  return {
    token,
    user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
  };
};

module.exports = { inscrire, connecter };