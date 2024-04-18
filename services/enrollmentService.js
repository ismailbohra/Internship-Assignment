const httpStatus = require("http-status");
const Enrollment  = require("../models/Enrollment");
const Course = require("../models/course");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../middelwares/resend");

const enrollUserInCourse = async (courseId, userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
    }
    const existingEnrollment = await Enrollment.findOne({
      where: { courseId, userId },
    });
    if (existingEnrollment) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User is already enrolled in the course");
    }

    const enrollment = await Enrollment.create({ courseId, userId });
    const templatePath = './EmailTemplates/CourseEnroll.html'
    const replacements = {
      '{{USERNAME}}': user.name,
      '{{COURSE_NAME}}': course.title,
    };
    console.log(replacements)
    const send = await sendEmail(user.email,"Course Enrollment",templatePath,replacements)
    if (!send.status) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    }
    return enrollment;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const removeEnrollment = async (enrollmentId) => {
  try {
    await Enrollment.destroy({ where: { id: enrollmentId } });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  enrollUserInCourse,
  removeEnrollment,
};
