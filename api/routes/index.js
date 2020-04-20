const quizRouter = require('./quiz-router');
const questionRouter = require('./question-router');
const attemptRouter = require('./attempt-router');

module.exports = (app) => {
    app.use('/quiz', quizRouter);
    app.use('/question', questionRouter);
    app.use('/attempt', attemptRouter);
}

