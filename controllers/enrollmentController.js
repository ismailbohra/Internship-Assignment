const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { successResponseGenerator, errorResponse } = require('../utils/ApiHelpers');
const enrollmentService = require('../services/enrollmentService');

const enrollUserInCourse = catchAsync(async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    const enrollment = await enrollmentService.enrollUserInCourse(courseId, userId);
    res.status(httpStatus.CREATED).send(successResponseGenerator(httpStatus.CREATED, 'Enrolled successfully', enrollment));
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse(error.statusCode, error.message));
  }
});

const removeEnrollment = catchAsync(async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    await enrollmentService.removeEnrollment(enrollmentId);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Enrollment removed successfully'));
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse(error.statusCode, error.message));
  }
});

module.exports = {
  enrollUserInCourse,
  removeEnrollment,
};
