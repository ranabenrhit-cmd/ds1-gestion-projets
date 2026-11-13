//recevoir la requête, appeler le service, répondre

//inscrit user 
const authService = require('./auth.service');
const register = async (req, res) => {
  try {
    const user = await authService.inscrire(req.body || {});//t5ali express y9ra il data il mb3outha en forma Json
    // il "|| {}" bch kn il req.body mch mwjoud wla 9imtou undefined wla null n3tiw lil service objet feregh 
    // 3lch ? bch mysirch mchkl w yt3ada service houa ytkafel bil validation w yrj3 il erreur il convenable 
    res.status(201).json({ message: 'Utilisateur inscrit avec succès', res: user });// controller yraj3 msg mt3 success w res fiha les info user maghir il mdp btbi3a 
    //201 -> Created ( il user tesna3 w t5asn bil base t3na )
  } catch (error) {
    const status = error.name === 'ValidationError' ? 400 : error.status || 500; // kn il erreur min nw3 validationError nb3thou 400
    //idha le nchoufou idha l'error 3ndou status code nst3mlouh idha m3ndouch n3tiyouh 500
    res.status(status).json({ message: error.message });//nrj3ou msg d'erreur 
  }
};


const login = async (req, res) => {
  try {
    const resultat = await authService.connecter(req.body || {});
    res.status(200).json({ message: 'Connexion réussie', res: resultat });//200 marra hedhy mch 201 khtr 3mla cnx mch creation 
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const me = (req, res) => {
  res.status(200).json({ message: 'Utilisateur connecté', res: req.user });
};

const listUsers = async (req, res) => {
  try {
    const users = await authService.listerUtilisateurs();
    res.status(200).json({ message: 'Liste des utilisateurs', res: users });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = { register, login, me, listUsers };