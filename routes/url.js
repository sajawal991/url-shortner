const express = require('express');
const { HandleGenerateShortURL } = require('../controller/url');
const router = express.Router();

router.post('/shorten', HandleGenerateShortURL);

module.exports = router;
