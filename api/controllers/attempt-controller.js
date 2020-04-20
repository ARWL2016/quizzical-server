const { getInstance } = require('../config/db');
const JSend = require('../utils/jsend');

const postAttempt = async(req, res) => {
    const db = getInstance();
    const jsend = new JSend();

    console.log(req.body)
    const attemptIn = req.body;

    console.log(attemptIn, typeof attemptIn)

    try {
        const attempt = await db.attempt.save(attemptIn);

        jsend.send(res, {attempt});
    } catch (err) {
        jsend.error(res, err);
    }
}

module.exports = {
    postAttempt
}