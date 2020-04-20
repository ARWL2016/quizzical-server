const express = require('express');
const { postAttempt } = require('../controllers/attempt-controller');

const attemptRouter = express.Router();

attemptRouter.post('/', postAttempt);

module.exports = attemptRouter;