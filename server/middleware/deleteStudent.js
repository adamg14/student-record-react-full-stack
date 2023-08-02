const mongoose = require("mongoose");
const Student = require("../models/Student");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

async function deleteStudent(number){
    let deleteStudentRequest = await Student.findOneAndDelete({ studentNumber: number });
    console.log("delete student request result " + deleteStudentRequest);
    return deleteStudentRequest;
}

module.exports = deleteStudent;