const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors');
const { authenticate } = require("./auth")
const { checkJWT } = require("./middle");
const { storeMidResult, storeFinalResult } = require('./StoreResult');
const { getStudents } = require('./getStudent');
const { getCourseID } = require('./getCourseID');
const path = require('path');
const { getDepartments } = require('./getDepartments');
const { excelDataToDatabase } = require('./exelDataToDatabse');
const { getCourses } = require('./getCourses');
const multer = require('multer');
const { getSemesterResult, getCourseResult } = require('./getResult');
require('dotenv').config();


const corsOptions = {
    origin: process.env.CROS,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

//Initializing Express Server App
const app = express();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
app.use(cors(corsOptions));

//server Static Files for App
//No need if not you want to host server only remove this and change '/' route code
app.use(express.static(path.join(__dirname, 'client/build')));

//Middle For Parsing Body Automatly
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Server Port
const port = process.env.PORT;

// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

//Root route for server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//Handle Login
app.post("/Login", (req, res) => {
    authenticate(req.body, res);
})
app.post("/CheckStatus", checkJWT, (req, res) => {
    res.status(200).json("");
})

app.post("/getCourseID", checkJWT, (req, res) => {
    getCourseID(req.body, res)
})
app.post("/storeMidResult", checkJWT, (req, res) => {
    storeMidResult(req.body, res)
})
app.post("/storeFinalResult", checkJWT, (req, res) => {
    storeFinalResult(req.body, res)
})
app.post("/getStudents", checkJWT, (req, res) => {
    getStudents(req.body, res)
})

app.post("/getCourses", checkJWT, (req, res) => {
    getCourses(req.body, res)
})

app.post("/getResult", checkJWT, (req, res) => {
    getSemesterResult(req.body, res)
})
app.post("/getCourseResult", checkJWT, (req, res) => {
    getCourseResult(req.body, res)
})

app.post("/getDepartments", checkJWT, (req, res) => {
    getDepartments(req.body, res)
})

app.post("/test", [upload.single('ExcelFile'), checkJWT], (req, res) => {
    excelDataToDatabase(req, res)
    res.status(200).json("Eror Handles not Implemented")
})


//Starting Server
app.listen(port, () => {
    console.log(`Example app listenings on port ${port}`);
})