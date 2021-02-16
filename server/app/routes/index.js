const express = require('express');
const router = express.Router();
const user = require('./user.routes');
const auth = require('./auth.routes');

router.get('/time', (req, res) => res.send(new Date().toISOString()));
router.use('/user', user);
router.use('/auth', auth)

module.exports = router;