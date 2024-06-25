const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('blog', { title: 'Blog', posts });
});

router.get('/new', (req, res) => {
    res.render('new_post', { title: 'New Post' });
});

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.redirect('/blog');
});

module.exports = router;
