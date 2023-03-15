const { decode } = require("./util")
const { getUser } = require("./auth")


const checkJWT = async (req, res, next) => {
    const { token } = req.body;
    const tokenData = decode(token);
    if(tokenData.id === undefined){
        return res.status(401).json("Token Missing")
    }
    const { username, password,exp } = tokenData?.id
    const dateNow = new Date()
    const userData = await getUser(username);
    if ((dateNow.getTime() / 1000) < exp && userData.username === username && userData.password === password) {
        next();
    } else if ((dateNow.getTime() / 1000) > exp) {
        return res.status(401).json("Token Expired");
    } else {
        return res.status(401).json("Token Invalid");
    }
}


module.exports = {
    checkJWT
}