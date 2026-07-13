const fs = require('fs');
const pathUtil = require('path');
const sqlite3 = require('better-sqlite3');
const dotenv = require('dotenv');
const envresult = dotenv.config({
    path:'config.env'
});
if (envresult.error) {
    console.error("Couldn't find config.env, make sure you duplicate config.env.example, add your config, then rename it to config.env");
    process.exit(1);
}
const config = process.env;

const resolvedDataDirectory = pathUtil.resolve(__dirname, '..', config.dataPath);
if (!fs.existsSync(resolvedDataDirectory)) {
    throw new Error(`Data path "${resolvedDataDirectory}" does not exist. Did you forget to mount it?`);
}

const db = new sqlite3(pathUtil.join(resolvedDataDirectory, 'nitron.db'));
db.pragma('journal_mode = WAL');
db.pragma('secure_delete = true');

module.exports = db;
