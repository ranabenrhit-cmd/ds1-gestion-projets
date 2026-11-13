// bch n3mlou middleware tw yverifie il token 9bal mtousl il requete lil contoller ( controle mt3 badge -> il token houa il badge illy chida5lk mil beb)
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.headers.authorization;//nkhdhou mil req mil headers il value mt3 authorization
  
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  
  const token = header.split(' ')[1];//split bch n9asmou bil espace w [1] bch nkhdhou il token brk khtr [0] hiya il Bearer

  try {
    
    const payload = jwt.verify(token, process.env.JWT_SECRET);//nverifiw il token idha s7i7 w mzl valable 

    req.user = { id: payload.id, role: payload.role };//nkhdhou il id wil role 

    next();//idha kol chy cv nkhaliw il requete tkml 
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = auth;