const mysql = require('mysql2')
require('dotenv').config();

const db = mysql.createConnection(
    process.env.DB_CONNECTION_URL
)

db.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

async function runQuery(query) {
    try {
        const res = await db.promise().query(query);
        return res[0];
    }
    catch (err) {
        return err;
    }
}
async function runQueryWithPlaceholder(query,placeholders) {
    try {
        const res = await db.promise().execute(query,placeholders);
        return res[0];
    }
    catch (err) {
        return err;
    }
}
module.exports = {
    db,
    runQuery,
    runQueryWithPlaceholder
};