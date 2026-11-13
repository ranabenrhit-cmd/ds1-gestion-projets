//middleware qui verifie il role mt3 il user 
// il first middleware yverifi nty chkoun w token mt3k valide wla le 
// w hedha yverifi il role mt3k chnw tnjm t3ml (3ndk droit bch t3ml il action hedhika wla le)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé : droits insuffisants' }); //403->interdit
    }

    next();
  };
};

module.exports = authorize;