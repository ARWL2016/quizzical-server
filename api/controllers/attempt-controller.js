const { getInstance } = require('../config/db');
const JSend = require('../utils/jsend');

const postAttempt = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    const { quiz_id, user_id, answers } = req.body;

    const now = new Date();
    const attemptIn = { quiz_id, user_id, datetime: now.toISOString() }


    try {
        const attempt = await db.attempt.save(attemptIn);

        Object.keys(answers).forEach(async key => {
            await db.attempt_answer.save({
                attempt_id: attempt.id,
                question_id: key,
                answer: answers[key]
            })
        });

        const result = await db.scripts.getQuizReport({
            attempt_id: attempt.id
        })

        jsend.send(res, { result });
    } catch (err) {
        jsend.error(res, err);
    }
}

module.exports = {
    postAttempt
}