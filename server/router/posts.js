const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { postController } = require('../controllers');

router.get('/', postController.getAllPosts);
router.get('/user/', auth(), postController.getProfilePosts);

router.post('/', auth(), postController.createPost);

module.exports = router