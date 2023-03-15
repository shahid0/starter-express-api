const { runQuery } = require("./Database")

const getDepartments = async ({ }, res) => {
    const departments = await runQuery(`SELECT * FROM department`);
    if (departments.length) {
        return res.status(200).json(departments)
    } else {
        return res.status(501).json("Department Error")
    }
}

module.exports = {
    getDepartments
}