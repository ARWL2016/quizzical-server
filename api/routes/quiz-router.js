const express = require('express');
const { getAll, getQuizById, getQuizQuestions } = require('../controllers/quiz-controller');

const quizRouter = express.Router();

// parent route: '/quiz' +

quizRouter.get('/', getAll);
quizRouter.get('/:id', getQuizById);
quizRouter.get('/:id/questions', getQuizQuestions);

module.exports = quizRouter;