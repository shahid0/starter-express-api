const { runQuery } = require("./Database")


const getStudents = async ({ DepartmentID, Session }, res) => {
    const students = await runQuery(`SELECT ID,Name FROM student WHERE Department_ID=${DepartmentID} AND Session='${Session}'`)
    if(students.errno){
        return res.status(501).json("DB Error")
    }else if(students.length){
        return res.status(200).json(students);
    }else{
        return res.status(404).json("Data Not Found")
    }
}

module.exports={
    getStudents
}