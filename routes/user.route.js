const express = require('express');
const router = express.Router();

router.get('/user', require('../sercives/user.service').get);

module.exports = router;