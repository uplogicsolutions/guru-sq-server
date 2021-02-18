const express = require('express');
const router = express.Router();
const auth = require('./auth.routes');

router.get('/time', (req, res) => res.send(new Date().toISOString()));
router.use('/auth', auth)

module.exports = router;