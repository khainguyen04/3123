const Student = require('../models/student');

// Render Add Student form
exports.getAddStudent = (req, res) => {
    res.render('student/addStudent');
};

// Handle Add Student
exports.postAddStudent = async (req, res) => {
    const { studentID, major, phone, fullName } = req.body;
    const newStudent = new Student({ studentID, major, phone, fullName });
    try {
        await newStudent.save();
        res.send('Student added successfully');
    } catch (error) {
        res.status(500).send('Failed to add student');
    }
};

// View all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('student/viewAllStudents', { students });
    } catch (error) {
        res.status(500).send('Failed to retrieve students');
    }
};

// View one student
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({ studentID: req.params.studentID });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.render('student/viewOneStudent', { student });
    } catch (error) {
        res.status(500).send('Failed to retrieve student');
    }
};
