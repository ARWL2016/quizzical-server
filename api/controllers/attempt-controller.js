const { getInstance } = require('../config/db');
const JSend = require('../utils/jsend');

const getAttempt = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    try {
        const attempt = await db.attempt.findOne({
            attempt_id: req.params.id
        });

        jsend.send(res, { attempt: attempt });
    } catch (err) {
        jsend.error(res, err);
    }
}

const getAttemptReport = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    try {
        const report = await db.scripts.getQuizReport({
            attempt_id: req.params.id
        })

        jsend.send(res, { report: report[0] });
    } catch (err) {
        jsend.error(res, err);
    }
}

const postAttempt = async (req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    const { quiz_id, user_id, answers } = req.body;

    const now = new Date();
    const attemptIn = { quiz_id, user_id }


    try {
        const attempt = await db.attempt.save(attemptIn);

        Object.keys(answers).forEach(async key => {
            const row =  {
                attempt_id: attempt.attempt_id,
                question_id: +key,
                option_id: +answers[key]
            }
            console.log({row});
            await db.option_selected.insert(row)
        });


        const result = await db.scripts.getQuizReport({
            attempt_id: attempt.attempt_id
        })


        jsend.send(res, { result: result[0] });
    } catch (err) {
        jsend.error(res, err);
    }
}

module.exports = {
    getAttempt, postAttempt, getAttemptReport
}