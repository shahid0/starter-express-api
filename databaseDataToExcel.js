const xlsx = require('xlsx');
const { runQuery } = require("./Database")

generateExcelSheet = async () => {
    const result = await runQuery("SELECT ID,Name FROM student")
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(result);
    xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    const file_name = 'data.xlsx';
    const file_path = file_name;
    xlsx.writeFile(workbook, file_path, { bookType: 'xlsx' });
}
generateExcelSheet()