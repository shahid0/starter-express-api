// const { decode } = require("./util")
// const { getUser } = require("./auth")
// const checkJWT = async (req, res, next) => {
//     const { token } = req.body;
//     const tokenData = decode(token);
//     if(tokenData.id === undefined){
//         return res.status(401).json("Token Missing")
//     }
//     const { username, password,exp } = tokenData?.id
//     const dateNow = new Date()
//     const userData = await getUser(username);
//     if ((dateNow.getTime() / 1000) < exp && userData.username === username && userData.password === password) {
//         next();
//     } else if ((dateNow.getTime() / 1000) > exp) {
//         return res.status(401).json("Token Expired");
//     } else {
//         return res.status(401).json("Token Invalid");
//     }
// }
const jwt = require("jsonwebtoken");
const { getUser } = require("./auth");

const checkJWT = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const decoded  = await jwt.verify(token, process.env.JWT_KEY);
        const user = await getUser(decoded.username);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (user == -1) {
            return res.status(401).json({ message: "Error occured" });
        }
        const isMatch = decoded.password === user.password;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Token invalid" });
    }
};


module.exports = {
    checkJWT
}