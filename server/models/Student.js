const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    id: Number,
    studentNumber: String,
    name: String,
    course: String
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;