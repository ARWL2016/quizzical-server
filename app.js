const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const bodyParser = require('body-parser');
const setRoutes = require('./api/routes/index');
const { connect } = require('./api/config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5000']
}));

setRoutes(app);

const port = 3001;


async function start() {
    const db = await connect();

    if (db) {
        app.listen(port, () => console.log(chalk.green(`[server] listening on port: http://localhost:${port}`)));
    }
}

start();
