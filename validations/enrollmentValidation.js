const Joi = require("joi");

const enrollUser = {
  body: Joi.object({
    courseId: Joi.number().integer().positive().required(),
    userId: Joi.number().integer().positive().required()
  })
};

const removeEnrollment = {
  params: Joi.object({
    enrollmentId: Joi.number().integer().positive().required()
  })
};

module.exports = {
  enrollUser,
  removeEnrollment
};
