const Joi = require("joi");

const getCourseByUserId = {
  params: Joi.object({
    userId: Joi.number().integer().positive().required()
  })
};

const getCourseById = {
  params: Joi.object({
    courseId: Joi.number().integer().positive().required()
  })
};

const getCourse = {
  query: Joi.object({
    category: Joi.string(),
    search: Joi.string(),
    page: Joi.number().integer(),
    pagesize: Joi.number().integer(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced'),
  })
};

const createCourse = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').required(),
    popularity: Joi.number().integer().min(0).default(0)
  })
};

const updateCourse = {
  body: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    title: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced'),
    popularity: Joi.number().integer().min(0)
  })
};

const deleteCourse = {
  params: Joi.object({
    courseId: Joi.number().integer().positive().required()
  })
};

module.exports = {
  getCourseByUserId,
  getCourseById,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
