/* bch kn tsir ghalta ahna m9rinelhch hsebha wla ghlta fil URL ki yb3thou il user 
exmple URL mch mwjoud wla ghalta fil body JSON mal écrit n9s virgule ou bien accolade 
yrj3lna erreur avec un code w  msg JSON mch page HTML */

//kn il route mch mwjouda nrj3ou 404 notFound
const notFound = (req, res) => {
  res.status(404).json({
    message: `Route introuvable : ${req.method} ${req.originalUrl}`, //req.method hiya il http method illy est3mlha l'utilisateur
    //req.originalUrl hiya l'URL m3a il query params illy tlbhom l'utilisateur idha mwjoudin 
  });
};

const errorHandler = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message;

  if (error.type === 'entity.parse.failed') {
    //il JSON fil Body maktoub bil ghalt 
    status = 400;
    message = 'JSON invalide dans le corps de la requête';
  } 
  else if (error.name === 'ValidationError' || error.name === 'CastError') {
    // erreur jeya min mongoose 
    //validationError yjiw ki mnrespctiwch il Schema 
    //CastError ki mtnjmch t3ml cast
     status = 400;
  } 
  else if (error.code === 11000) {
    //value lzmha tkoun unique w hiya deja existante 
    status = 409;
    message = 'Cette valeur existe déjà';
  }

  if (status === 500) {
    //erreur mch mtw93a w n3rfouch sbabha dnc nconsoltiw il terminal
    console.error(error);
  }

  res.status(status).json({ message });
};

module.exports = { notFound, errorHandler };