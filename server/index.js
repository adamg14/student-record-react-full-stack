const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helloWorld = require("./middleware/helloWorld");
const bodyParser = require("body-parser");
const getStudents = require("./middleware/getStudents");
const addStudent = require("./middleware/addStudent");
const editStudent = require("./middleware/editStudent");
const deleteStudent = require("./middleware/editStudent");
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

app.post("/add-student", function(request, response){
    // INCREMENT THE ID
    // these should be the input in the body of the post request from the react application
    let studentNumber = request.body.studentNumber;
    let studentName = request.body.studentName;
    let studentCourse = request.body.studentCourse;

    addStudent(studentNumber, studentName, studentCourse).then(function(result){
        response.send(result);
    })
});

app.post("/edit-student", function(request, response){
    // request body from the react frontend application
    let studentNumber;
    let studentName;
    let studentCourse;

    editStudent(studentNumber, studentName, studentCourse).then(function(result){
        response.send(result);
    });
});

app.post("/delete-student", function(){
    let studentNumber;
    let studentName;
    let studentCourse;

    deleteStudent(studentNumber, studentName, studentCourse).then(function(result){
        return result;
    });
});
app.listen(4000, function(){
    console.log("server running on port 4000");
});