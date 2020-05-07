const express = require('express');
const { getAll, getQuizById, getQuizQuestions, postQuiz } = require('../controllers/quiz-controller');

const quizRouter = express.Router();

// parent route: '/quiz' +

quizRouter.get('/', getAll);
quizRouter.get('/:id', getQuizById);
quizRouter.get('/:id/questions', getQuizQuestions);
quizRouter.post('/', postQuiz);

module.exports = quizRouter;