const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!typeof (error == ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false);
  }
  next(error);
};
const errorHandler = (err, req, res, next) => {
  let { message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: 500,
    message,
  };

  res.status(500).send(response);
};
module.exports = {
  errorConverter,
  errorHandler,
};
