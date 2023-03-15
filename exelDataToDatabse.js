const xlsx = require('xlsx');
const { runQueryWithPlaceholder } = require("./Database")

const excelDataToDatabase = (req, res) => {
    const { Session } = req.body;
    const { departmentID } = req.body;
    const workbook = xlsx.read(req.file?.buffer);
    const sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
        header: ['RollNo', 'Name']
    });

    //todo add error handle response ok if data save error if not
    data.forEach(async student => {
        if (student?.RollNo && student?.Name && !isNaN(student?.RollNo)) {
            const res = await runQueryWithPlaceholder("INSERT INTO student (ID,Department_ID,Session,Name) VALUES (?,?,?,?)", [student.RollNo, departmentID, Session, student.Name])
        }
    })
}

module.exports = {
    excelDataToDatabase
} 