const { Op } = require("sequelize");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const Course = require("../models/course");

const getCourseById = async (courseId) => {
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
    }
    return course;
  } catch (error) {
    console.error("Error fetching course by courseId:", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getCourse = async (req) => {
  try {
    const { page = 1, pagesize = 10, search, level, category } = req.query;
    const offset = (page - 1) * pagesize;

    const searchCondition = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const filterCondition = {};
    if (level) {
      filterCondition.level = level;
    }
    if (category) {
      filterCondition.category = category;
    }
    const courses = await Course.findAndCountAll({
      where: {
        ...searchCondition,
        ...filterCondition,
      },
      offset,
      limit: pagesize,
    });

    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const createCourse = async (courseData) => {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    console.error("Error creating course:", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateCourse = async (courseData) => {
  try {
    const { id } = courseData;
    const course = await Course.findByPk(id);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
    }
    await course.update(courseData);
    return course;
  } catch (error) {
    console.error("Error updating course:", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteCourse = async (courseId) => {
  try {
    console.log(courseId);
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
    }
    await course.destroy();
  } catch (error) {
    console.error("Error deleting course:", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  getCourseById,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
