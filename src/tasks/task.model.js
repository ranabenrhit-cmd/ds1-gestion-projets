const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre de la tâche est obligatoire'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    statut: {
      type: String,
      enum: {
        values: ['todo', 'doing', 'done'],
        message: 'Le statut doit être : todo, doing ou done',
      },
      default: 'todo',
    },
    deadline: {
      type: Date,
    },
    projet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assigneA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);