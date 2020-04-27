const express = require('express');
const { postAttempt, getAttempt, getAttemptReport } = require('../controllers/attempt-controller');

const attemptRouter = express.Router();

attemptRouter.get('/:id', getAttempt);
attemptRouter.get('/:id/report', getAttemptReport);
attemptRouter.post('/', postAttempt);

module.exports = attemptRouter;