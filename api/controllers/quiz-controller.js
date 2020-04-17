const { getInstance } = require('../config/db');
const JSend = require('../utils/jsend');



const getAll = async(req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    console.log('getting all')

    try {
        const quizzes = await db.quiz.find();
        jsend.send(res, {quizzes});
    } catch (err) {
        jsend.error(res, err);
    }

}

const getQuizById = async(req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    try {
        const quiz = await db.quiz.find({
            id: req.params.id
        });
        jsend.send(res, {quiz: quiz[0]});
    } catch (err) {
        jsend.error(res, err);
    }
}

const getQuizQuestions = async(req, res) => {
    const db = getInstance();
    const jsend = new JSend();
    const quiz_id = req.params.id;

    try {
        const [quiz, questions] = await Promise.all([
            db.quiz.findOne({
                id: quiz_id
            }),
            db.scripts.getQuestions({quiz_id})
        ]);

        jsend.send(res, {quiz, questions});
    } catch (err) {
        jsend.error(res, err);
    }
}


module.exports = {
    getAll, getQuizById, getQuizQuestions
}