const Post = require('../models/Post');

// Crear un post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = new Post({ title, content, category, author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Listar todos los posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('category', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');
    if (!post) return res.status(404).json({ msg: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!post) return res.status(404).json({ msg: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post no encontrado' });
    res.json({ msg: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
