const { getInstance } = require('../config/db');
const JSend = require('../utils/jsend');



const getAll = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    console.log('getting all')

    try {
        const quizzes = await db.quiz.find();
        jsend.send(res, { quizzes });
    } catch (err) {
        jsend.error(res, err);
    }

}

const getQuizById = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    try {
        const quiz = await db.quiz.find({
            quiz_id: req.params.id
        });
        jsend.send(res, { quiz: quiz[0] });
    } catch (err) {
        jsend.error(res, err);
    }
}

const getQuizQuestions = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();
    const quiz_id = req.params.id;

    try {
        const [quiz, questions] = await Promise.all([
            db.quiz.findOne({
                quiz_id: quiz_id
            }),
            db.scripts.getQuestions({ quiz_id })
        ]);

        jsend.send(res, { quiz, questions });
    } catch (err) {
        jsend.error(res, err);
    }
}

const postQuiz = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    const { quizTitle, questions } = req.body;

    try {
        // save quiz
        const quiz = await db.quiz.save({
            title: quizTitle,
            user_id: 0
        });

        // save questions
        questions.forEach(async q => {

            const savedQuestion = await db.question.save({
                question_number: q.number,
                text: q.text,
                quiz_id: quiz.quiz_id
            });

            // save correct answer
            await db.option.save({
                question_id: savedQuestion.question_id,
                text: q.correctAnswer,
                is_correct: true
            });

            // save incorrect answers
            q.options.forEach(async o => {
                await db.option.save({
                    question_id: savedQuestion.question_id,
                    text: o,
                    is_correct: false
                })
            });


        });

        jsend.send(res, { quiz });
    } catch (err) {
        jsend.error(res, err);
    }
}


module.exports = {
    getAll, getQuizById, getQuizQuestions, postQuiz
}