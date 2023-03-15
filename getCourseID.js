const { runQueryWithPlaceholder } = require("./Database")
const { strToNum } = require("./util")

const getCourseID =async ({ CourseCode, CourseName }, res) => {
    const Course = await runQueryWithPlaceholder(`SELECT * FROM course WHERE C_ID=?`,[CourseCode])
    if (Course.length) {
        res.status(200).json(Course[0].ID)
    } else {
        const ID = strToNum(CourseCode)
        const ret = await runQueryWithPlaceholder(`INSERT INTO course VALUES (?,?,?)`,[ID,CourseCode,CourseName])
        if(ret.errno){
            console.log(ret)
            return res.status(501).json("Coures ID Error")
        }else{
            return res.status(200).json(ID);
        }
    }
}

module.exports = {
    getCourseID
}