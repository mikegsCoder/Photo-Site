const router = require('express').Router();
const users = require('./users');
const test = require('./test');

router.use('/users', users);
router.use('/test', test);

module.exports = router;
