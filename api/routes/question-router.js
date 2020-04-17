const express = require('express');
const { getQuestionsByQuizId } = require('../controllers/question-controller');

const questionRouter = express.Router();

/**
 *  Parent route: /question
 */

questionRouter.get('/:id', getQuestionsByQuizId);

module.exports = questionRouter;