const { runQueryWithPlaceholder } = require("./Database")

const getSemesterResult = async ({ SemesterID, Session }, res) => {
    const result = await runQueryWithPlaceholder(`SELECT * FROM student_results
    WHERE Semester=? AND Session=?`, [SemesterID, Session])
    if (result.errno) {
        return res.status(501).json({ message: "DB Error" })
    } else if (result.length) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "Data Not Found" })
    }
}
const getCourseResult = async ({ CourseCode, Session }, res) => {
    const result = await runQueryWithPlaceholder(`SELECT * FROM student_results
    WHERE CourseCode=? AND Session=?`, [CourseCode, Session])
    if (result.errno) {
        return res.status(501).json({ message: "DB Error" })
    } else if (result.length) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "Data Not Found" })
    }
}

module.exports = {
    getSemesterResult,
    getCourseResult
}