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
      ref: 'User',
      required: true,
    },
    statut: {
      type: String,
      enum: ['en cours', 'terminé', 'en pause'],
      default: 'en cours',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);