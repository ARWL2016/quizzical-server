const massive = require('massive');

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
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




