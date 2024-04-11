const express = require('express');
const router = express.Router();
const validate = require('../middelwares/validate');
const enrollmentController = require('../controllers/enrollmentController');
const enrollmentValidation = require('../validations/enrollmentValidation');

router.route('/').post(validate(enrollmentValidation.enrollUser), enrollmentController.enrollUserInCourse);
router.route('/:enrollmentId').delete(validate(enrollmentValidation.removeEnrollment), enrollmentController.removeEnrollment);

module.exports = router;
