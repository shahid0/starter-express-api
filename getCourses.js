const { runQueryWithPlaceholder } = require("./Database")


const getCourses = async ({ DepartmentID }, res) => {
    const courses = await runQueryWithPlaceholder(`SELECT CourseCode,Name FROM course WHERE Department_ID=?`,[DepartmentID])
    if(courses.errno){
        return res.status(501).json("DB Error")
    }else if(courses.length){
        return res.status(200).json(courses);
    }else{
        return res.status(404).json("Data Not Found")
    }
}

module.exports={
    getCourses
}