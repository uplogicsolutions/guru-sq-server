const express = require('express');
const router = express.Router();
const OptionsController = require('../controllers/options.controller');

router.get("/", OptionsController.options);

module.exports = router;