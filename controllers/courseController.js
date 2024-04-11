const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { successResponseGenerator, errorResponse } = require('../utils/ApiHelpers');
const courseService = require('../services/courseService');


const getCourseById = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await courseService.getCourseById(courseId);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Course fetched successfully', course));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});

const getCourse = catchAsync(async (req, res) => {
  try {
    const courses = await courseService.getCourse(req);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Courses fetched successfully', courses));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});

const createCourse = catchAsync(async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(httpStatus.CREATED).send(successResponseGenerator(httpStatus.CREATED, 'Course created successfully', course));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});

const updateCourse = catchAsync(async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.body);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Course updated successfully', course));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});

const deleteCourse = catchAsync(async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.courseId);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Course deleted successfully'));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});

module.exports = {
  getCourseById,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
