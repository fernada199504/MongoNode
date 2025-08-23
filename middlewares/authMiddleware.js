const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');

// Verificar token
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // formato "Bearer token"
    if (!token) return res.status(401).json({ msg: 'No autorizado, falta token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ msg: 'Usuario no encontrado' });

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

// Verificar rol de administrador
exports.isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ msg: 'Acceso denegado, solo admin puede realizar esta acción' });
  }
  next();
};