const mongoose = require("mongoose");
const Student = require("../models/Student");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

async function deleteStudent(number){
    Student.findOneAndDelete({ studentNumber: number }).then(function(){
        return "Student deleted from database";
    });
}

module.exports = deleteStudent;