const Comment = require('../models/Comment');

// Crear comentario
exports.createComment = async (req, res) => {
  try {
    const { content, post } = req.body;
    const comment = new Comment({
      content,
      post,
      author: req.user._id
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Listar comentarios de un post
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Eliminar comentario
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ msg: 'Comentario no encontrado' });
    res.json({ msg: 'Comentario eliminado' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};