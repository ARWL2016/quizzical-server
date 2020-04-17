const quizRouter = require('./quiz-router');
const questionRouter = require('./question-router');

module.exports = (app) => {
    app.use('/quiz', quizRouter);
    app.use('/question', questionRouter);
}

