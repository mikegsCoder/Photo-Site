const router = require('express').Router();
const users = require('./users');
const posts = require('./posts');
const test = require('./test');

router.use('/users', users);
router.use('/posts', posts);
router.use('/test', test);

module.exports = router;
