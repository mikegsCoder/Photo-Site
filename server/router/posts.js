const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

router.get('/', postController.getAllPosts);
router.get('/user/', auth(), postController.getProfilePosts);

router.post('/', auth(), postController.createPost);
router.get('/:id', postController.getPost);
router.put('/:id', auth(), postController.updatePost);
router.delete('/:id', auth(), postController.deletePost);

router.post('/votep/:id', auth(), postController.votePositive);
router.post('/voten/:id', auth(), postController.voteNegative);

module.exports = router