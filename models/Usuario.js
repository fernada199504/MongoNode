const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definir el esquema de Usuario
const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario"
  }
}, {
  timestamps: true
});

// Middleware: antes de guardar, encriptar contraseña
UsuarioSchema.pre("save", async function(next) {
  if (!this.isModified("contraseña")) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método: comparar contraseñas
UsuarioSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.contraseña);
};

// Exportar el modelo
const Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;