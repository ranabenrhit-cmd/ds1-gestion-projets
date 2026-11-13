const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du projet est obligatoire'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //il objectID hedheka mwjoud fi modele esmou user 
      required: true,//khtr kol project lzm ykoun 3ndou owner
    },
    statut: {
      type: String,
      enum: ['en cours', 'terminé', 'en pause'],
      default: 'en cours',// kn mahatinech statut tt7at par defaut "en cours" 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);