const { runQueryWithPlaceholder } = require("./Database")

const storeMidResult = async ({ RollNo, courseCode, semesterID, marks },ret) => {
    const res = await runQueryWithPlaceholder(`INSERT INTO midresult(CourseCode,Student_ID,Semester_ID,Marks) VALUES (?,?,?,?)`,[courseCode,RollNo,semesterID,marks])
    if (res.errno) {
        switch (res.errno) {
            case 1062:
                const res1 = await runQueryWithPlaceholder(`UPDATE  midresult SET Marks=? WHERE CourseCode=? AND Student_ID=? AND Semester_ID=?`,[marks,courseCode,RollNo,semesterID])
                return ret.status(200).json("Updated")
                break;
            default:
                return ret.status(501).json("Error")
                break;
        }
    }
    return ret.status(200).json("Inserted")
}
const storeFinalResult = async ({ RollNo, courseCode, semesterID,Quiz,Presentation,Assignment, marks },ret) => {
    const res = await runQueryWithPlaceholder(`INSERT INTO finalresult(CourseCode,Student_ID,Semester_ID,Quiz,Presentation,Assignment,Marks) VALUES (?,?,?,?,?,?,?)`,[courseCode,RollNo,semesterID,Quiz,Presentation,Assignment,marks])
    if (res.errno) {
        switch (res.errno) {
            case 1062:
                const res1 = await runQueryWithPlaceholder(`UPDATE finalresult SET Quiz=?,Presentation=?,Assignment=?,Marks=? WHERE CourseCode=? AND Student_ID=? AND Semester_ID=?`,[Quiz,Presentation,Assignment,marks,courseCode,RollNo,semesterID])
                return ret.status(200).json("Updated")
                break;
            default:
                return ret.status(501).json("Error")
                break;
        }
    }
    return ret.status(200).json("Inserted")
}

module.exports = {
    storeMidResult,
    storeFinalResult
}