const massive = require('massive');

const config = {
    host: '127.0.0.1',
    port: 5432,
    database: 'quizzical',
    user: 'quizzical',
    password: 'password'
}

let _db; // massive instance

async function connect() {
    try {
        _db = await massive(config);
        console.log(`[massive] connected to ${config.database} on ${config.host}:${config.port}`);
        console.log(_db.listTables())

        return _db;
    } catch (err) {
        console.log('[massive] DATABASE CONNECTION ERROR: ', err.message);

    }
}

function getInstance() {
    return _db;
}

module.exports = {
    connect,
    getInstance
}




