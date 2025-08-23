const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const {
  createComment,
  getCommentsByPost,
  deleteComment
} = require('../controllers/commentController');

router.post('/', auth, createComment);
router.get('/:postId', getCommentsByPost);
router.delete('/:id', auth, deleteComment);

module.exports = router;    