const mongoose = require('mongoose');

const soundMixerSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
    unique: true,
    required: [true, 'El número de serie es requerido']
  },
  brand: {
    type: String,
    required: [true, 'La marca es requerida'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'El modelo es requerido'],
    trim: true
  },
  channels: {
    type: Number,
    required: [true, 'El número de canales es requerido'],
    min: [0, 'El número de canales debe ser mayor o igual a 0']
  },
  weight: {
    type: Number,
    required: [true, 'El peso es requerido'],
    min: [0, 'El peso debe ser mayor o igual a 0']
  },
  isNew: {
    type: Boolean,
    required: [true, 'Especificar si es nuevo es requerido']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio debe ser mayor o igual a 0']
  }
}, {
  collection: 'SoundMixer',
  timestamps: true
});

module.exports = mongoose.model('SoundMixer', soundMixerSchema);