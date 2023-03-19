const { db } = require("./Database");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function getUser(username) {
    try {
        const [rows, _] = await db.promise().execute(`SELECT * FROM auth WHERE username=?`, [username]);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        console.error(`Error fetching user ${username}: ${error}`);
        throw error;
    }
}

async function createToken(user) {
    const token = await jwt.sign({
        userId: user.id,
        username: user.username,
        password: user.password,
    }, process.env.JWT_KEY, { expiresIn: '1d' });

    return token;
}

async function authenticate({ username, password }, res) {
    try {
        const user = await getUser(username);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await createToken(user);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(`Error authenticating user ${username}: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    authenticate,
    getUser
};
