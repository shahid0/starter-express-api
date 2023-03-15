const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "0penID"

const generate = (id, cb) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d' });

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (err) {
        return err
    }
};

const strToNum = (str) => {
    let out = 0;
    for (let i = 0; i < str.length; i++) {
        out += str[i].toLowerCase().charCodeAt(0);
    }
    return out;
}
module.exports = {
    generate,
    decode,
    strToNum
}