const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Add Student
router.get('/addstudent', studentController.getAddStudent);
router.post('/addstudent', studentController.postAddStudent);

// View All Students
router.get('/allstudents', studentController.getAllStudents);

// View One Student
router.get('/student/:studentID', studentController.getStudentById);

module.exports = router;
