const mongoose = require("mongoose");
const Student = require("../models/Student");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

async function getStudents(){
    // should add error checking
    const getStudentsResult = await Student.find();
    return getStudentsResult;
};

module.exports = getStudents;