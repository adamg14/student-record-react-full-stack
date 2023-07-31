const mongoose = require("mongoose");
const Student = require("../models/Student");


require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

async function editStudent(number, name, course){
    Student.findOneAndUpdate({studentNumber: number}, {$set: {studentNumber: number, name: name, course: course}}, {new: true}).then(function(){
        return "Student record updated";
    });
};

module.exports = editStudent;