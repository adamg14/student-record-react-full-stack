const mongoose = require("mongoose");
const Student = require("../models/Student");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

async function addStudent(number, name, course){
    try {
        const newStudent = new Student({
            studentNumber: number,
            name: name,
            course: course
        });
    
        newStudent.save().then(function(){
            return "Student addded to the database";
        });
    } catch (error) {
        return "An error has occurred";   
    }

};

module.exports = addStudent;