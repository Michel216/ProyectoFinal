const express = require('express');
const userEpController = require('../controllers/userEp.js');

const userEpRoute = express.Router()

userEpRoute.post('/login', userEpController.login);

module.exports = userEpRoute