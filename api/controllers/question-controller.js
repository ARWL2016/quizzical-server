const { getInstance } = require('../config/db');
const JSend = require('../utils/jsend');


// deprecated
const getQuestionsByQuizId = async(req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    console.log(req.params)

    try {
        const questions = await db.scripts.getQuestions({
            quiz_id: +req.params.id
        })
        jsend.send(res, {questions});
    } catch (err) {
        jsend.error(res, err);
    }
}


module.exports = {
    getQuestionsByQuizId
}