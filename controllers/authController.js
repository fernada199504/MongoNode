const jwt = require("jsonwebtoken");
const User = require("../models/Usuario");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body; 

    // Buscar usuario por email
    const user = await User.findOne({ correo });
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

   
    // Validar contraseña
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    console.log("Coincide?:", isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Generar token
    const token = jwt.sign(
      { id: user._id, rol: user.rol }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ msg: "Error en el servidor", error: err.message });
  }
};