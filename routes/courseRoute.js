const express = require('express');
const router = express.Router();
const validate = require('../middelwares/validate');
const courseController = require('../controllers/courseController');
const  courseValidation  = require('../validations/courseValidation');
const { isAdmin }  = require('../middelwares/adminAccess');
const { verifyToken } = require('../middelwares/Jwt');

 
router.route('/getCourseById/:courseId').get(verifyToken, validate(courseValidation.getCourseById), courseController.getCourseById); 
router.route('/').get(verifyToken,validate(courseValidation.getCourse), courseController.getCourse); 
router.route('/').put(verifyToken, isAdmin, validate(courseValidation.updateCourse), courseController.updateCourse); 
router.route('/').post(verifyToken, isAdmin, validate(courseValidation.createCourse), courseController.createCourse); 
router.route('/:courseId').delete(verifyToken,isAdmin, validate(courseValidation.deleteCourse), courseController.deleteCourse); 

module.exports = router;
