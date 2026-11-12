//Express maywafrch des exceptions hadhrin kima NestJS 
//kima mithel NotFoundException hedheka 3lch n3mlou notre propre version
// n3mlou function tasn3 erreur fiha msg w code 

const httpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = httpError;