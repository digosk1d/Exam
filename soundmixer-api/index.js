const express = require('express');
const connectDB = require('./config/db');
const soundMixerRouter = require('./routes/soundMixerRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());

app.use('/api/soundmixer', soundMixerRouter);

connectDB().then(() => {
  app.listen(port, (error) => {
    if (error) {
      console.error('Error al iniciar el servidor:', error.message);
      return;
    }
    console.log(`Servidor corriendo en puerto ${port}`);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});