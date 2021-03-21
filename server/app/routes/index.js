const express = require('express');
const router = express.Router();
const auth = require('./auth.routes');
const options = require('./options.route');
const user = require('./user.route');
const post = require('./post.route');
const { JWTMiddleware } = require('../middlewares/JWTMiddleware');

router.get('/time', (req, res) => res.send(new Date().toISOString()));
router.use('/auth', auth);

router.use(JWTMiddleware);
router.use('/options', options);
router.use('/user', user);
router.use('/post', post);

module.exports = router;