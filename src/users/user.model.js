/*9bal mn3mlou inscrit il ay 3bd il base lzm t3rf li chnw ychanah 
a user chnouma les champs illy 3ndou chnwa illy obligatoire fihom 
chnouma les valeurs illy nsmhou bihom 3la hedheka bch n3mlou modéle 
dwrou y3ml description lil structure mt3 a user c' l'equivalent de l'entité
(puisque on travail avec mangoDB on gére des schemas et models )
*/
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
    nom: {//nom kifch lzmou ykoun
      type: String,
      required: [true, 'Le nom est obligatoire'],//le nom obligatoire w s'il manque ytl3 il msg d'erreur hedheka
      trim: true,//na7iw les espaces illy miloul w fill5r 
    },
    login: {
      type: String,
      required: [true, 'Le login est obligatoire'],
      unique: true,//myjich deux utilisateur b nafs login
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
    },
    role: {
      type: String,
      enum: ['user', 'manager'],//kima @IsIs my9bl kn user wla manager 
      default: 'user',//kn mthatch hatta role tthat user par defaut 
    },
  },
  {
    timestamps: true, //tzid automatiquement createdAt w updatedAt
  }
);

//n3mlou creation lil modele qui sert mb3d bch n3mlou creation wla recherche .. 
module.exports = mongoose.model('User', userSchema);

//MongoDB yzid whdou champ _id il kol user