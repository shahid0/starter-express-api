const { runQueryWithPlaceholder } = require("./Database")

const storeMidResult = async ({ RollNo, courseID, semesterID, marks },ret) => {
    const res = await runQueryWithPlaceholder(`INSERT INTO midresult(Course_ID,Student_ID,Semester_ID,Marks) VALUES (?,?,?,?)`,[courseID,RollNo,semesterID,marks])
    if (res.errno) {
        switch (res.errno) {
            case 1062:
                const res1 = await runQueryWithPlaceholder(`UPDATE  midresult SET Marks=? WHERE Course_ID=? AND Student_ID=? AND Semester_ID=?`,[marks,courseID,RollNo,semesterID])
                return ret.status(200).json("Updated")
                break;
            default:
                return ret.status(501).json("Error")
                break;
        }
    }
    return ret.status(200).json("Inserted")
}
const storeFinalResult = async ({ RollNo, courseID, semesterID,Quiz,Presentation,Assignment, marks },ret) => {
    const res = await runQueryWithPlaceholder(`INSERT INTO finalresult(Course_ID,Student_ID,Semester_ID,Quiz,Presentation,Assignment,Marks) VALUES (?,?,?,?,?,?,?)`,[courseID,RollNo,semesterID,Quiz,Presentation,Assignment,marks])
    if (res.errno) {
        switch (res.errno) {
            case 1062:
                const res1 = await runQueryWithPlaceholder(`UPDATE finalresult SET Quiz=?,Presentation=?,Assignment=?,Marks=? WHERE Course_ID=? AND Student_ID=? AND Semester_ID=?`,[Quiz,Presentation,Assignment,marks,courseID,RollNo,semesterID])
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