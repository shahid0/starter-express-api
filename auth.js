const { db } = require("./Database")
const jwt = require("./util");
require('dotenv').config();

const JWTKEY = process.env.jWT_KEY;


async function IsAuthenticated({username, password}, res) {
    let token = "";
    try {
        user = await getUser(username)
        if (user === -1) {
            return res.status(500).json("Error IA");
        }
        if (user === 0) {
            return res.status(401).json("User Not Found");
        }
        if (username === user.username && password === user.password) {
            token = jwt.generate({
                username: user.username,
                password: password,
                userId: user.id,
                exp : Math.floor(Date.now() / 1000) + (24 * 3600)

            },
                JWTKEY, {
                expiresIn : "1d"
            }
            );
            return res.status(200).json(token)
        }
        return res.status(401).json("Unathorized")
    }
    catch (err) {
        return false;
    }
}
async function getUser(username) {
    try {
        const res = await db.promise().execute(`SELECT * FROM auth WHERE username=?`,[username]); 
        if (!res[0].length) {
            return 0;
        }
        return res[0][0];
    }
    catch (err) {
        console.log(err);
        return -1;
    }
}

module.exports = {
    IsAuthenticated,
    getUser
};