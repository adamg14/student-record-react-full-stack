const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const getStudents = require("./middleware/getStudents");
const addStudent = require("./middleware/addStudent");
const editStudent = require("./middleware/editStudent");
const deleteStudent = require("./middleware/deleteStudent");
const Student = require("./models/Student");

require("dotenv").config();

const countID = 2;

mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();

// Middleware to parse JSON data in the request body (Optional for Express 4.16.0+)
app.use(express.json());

// Middleware to parse URL-encoded data in the request body (Optional for Express 4.16.0+)
app.use(express.urlencoded({ extended: true }));

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

app.get("/", function(request, response){
    getStudents().then(function(result){
        console.log(result);
        response.send(result); 
    });
});

app.post("/add-student", async function(request, response){
    // INCREMENT THE ID
    // these should be the input in the body of the post request from the react application
    let studentNumber = request.body.studentNumber;
    let studentName = request.body.studentName;
    let studentCourse = request.body.studentCourse;

    const addStudentResult = await addStudent(studentName, studentName, studentCourse);
    response.send(addStudentResult);
});

app.post("/edit-student", async function(request, response){
    // request body from the react frontend application
    let studentNumber = request.body.studentNumber;
    let studentName = request.body.studentName;
    let studentCourse = request.body.studentCourse;

    let editStudentResult = await editStudent(studentNumber, studentName, studentCourse);
    response.send(editStudentResult);
});

app.post("/delete-student", async function(request, response){
    let studentNumber = request.body.deleteStudent;
    let deleteStudentResult = await deleteStudent(studentNumber);
    response.send(deleteStudentResult);
});

app.listen(4000, function(){
    console.log("server running on port 4000");
});