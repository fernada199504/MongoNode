const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middlewares/authMiddleware');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/CategoryController');

router.post('/', auth, isAdmin, createCategory);
router.get('/', getCategories);
router.put('/:id', auth, isAdmin, updateCategory);
router.delete('/:id', auth, isAdmin, deleteCategory);

module.exports = router;