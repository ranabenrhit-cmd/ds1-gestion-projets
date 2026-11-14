/*il projects wil tasks 3ndhom meme logique fil function hedhouma 
dnc fi 3oudh mnktbou code mrtin n3mlou file w nktbou fonctions utilitaires*/ 


// on protege il txt mil special caracteres so we don't broke il search 
// for emple il () 3ndhom m3na fi Regular Expressions dnc nhebou we protect them so the search yt3aml m3ahom k a7rof 3adiya
const echapper = (texte) => String(texte).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');// "/g" m3neha global ybdl il roumouz kol w mch awl whd brk

//n3mlou tri 3la results : 3la hasb ana champ w fi ana ordre ..
const construireTri = (query, champsAutorises, champParDefaut) => {
    // we use il champ illy 5tarou il utilisateur kenou mwjoud fi champsAutorises sinn nst3mlou champParDefaut
    const champ = champsAutorises.includes(query.sort) ? query.sort : champParDefaut;
    const ordre = query.order === 'asc' ? 1 : -1;

  return { [champ]: ordre };
};

module.exports = { echapper, construireTri };