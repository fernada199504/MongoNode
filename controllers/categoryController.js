const Category = require('../models/Category');

// Crear categoría
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Listar categorías
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Actualizar categoría
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!category) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Eliminar categoría (solo admin)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json({ msg: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};