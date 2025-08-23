const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); // <-- Corregido
const usuarioController = require("../controllers/usuarioController");

router.post("/", usuarioController.crearUsuario);
router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuario);   // Leer uno
router.put("/:id", usuarioController.actualizarUsuario); // Actualizar
router.delete("/:id", usuarioController.eliminarUsuario); // Eliminar

module.exports = router;