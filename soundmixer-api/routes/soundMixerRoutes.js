const express = require('express');
const SoundMixer = require('../models/soundMixer');

const router = express.Router();

// POST /soundmixer - Crear un nuevo mezclador
router.post('/', async (req, res) => {
  try {
    const newSoundMixer = new SoundMixer(req.body);
    const savedSoundMixer = await newSoundMixer.save();
    res.status(201).json(savedSoundMixer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /soundmixer - Obtener todos los mezcladores
router.get('/', async (req, res) => {
  try {
    const soundMixers = await SoundMixer.find();
    res.json(soundMixers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /soundmixer/:serialNumber - Actualizar un mezclador
router.put('/:serialNumber', async (req, res) => {
  try {
    const updatedSoundMixer = await SoundMixer.findOneAndUpdate(
      { serialNumber: req.params.serialNumber },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSoundMixer) {
      return res.status(404).json({ message: 'Mezclador no encontrado' });
    }
    res.json(updatedSoundMixer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /soundmixer/:serialNumber - Eliminar un mezclador
router.delete('/:serialNumber', async (req, res) => {
  try {
    const deletedSoundMixer = await SoundMixer.findOneAndDelete({
      serialNumber: req.params.serialNumber
    });
    if (!deletedSoundMixer) {
      return res.status(404).json({ message: 'Mezclador no encontrado' });
    }
    res.json({ message: 'Mezclador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /soundmixer/:serialNumber - Buscar un mezclador por número de serie
router.get('/:serialNumber', async (req, res) => {
  try {
    const soundMixer = await SoundMixer.findOne({
      serialNumber: req.params.serialNumber
    });
    if (!soundMixer) {
      return res.status(404).json({ message: 'Mezclador no encontrado' });
    }
    res.json(soundMixer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;