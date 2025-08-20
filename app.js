// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');



const usuariosRoutes = require('./routes/usuariosroutes'); // más abajo creamos este archivo

const app = express();
app.use(cors());
app.use(express.json()); // parsea JSON

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/backenddb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('✅ MongoDB conectado'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });

// Endpoint de verificación
app.get('/', (req, res) => res.send('API funcionando ✅'));

// Rutas
app.use('/api/usuarios', usuariosRoutes);

// Middleware de manejo de errores sencillo
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Error interno' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
