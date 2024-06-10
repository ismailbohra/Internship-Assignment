const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { successResponseGenerator, errorResponse } = require('../utils/ApiHelpers');
const  userService  = require('../services/userService');

const registerUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(httpStatus.CREATED).send(successResponseGenerator(httpStatus.CREATED, 'user created successfully', user));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(httpStatus.BAD_REQUEST, error.message,));
  }
});
const updateUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.updateUser(req.body);
    res.status(httpStatus.CREATED).send(successResponseGenerator(httpStatus.CREATED, 'user updated successfully', user));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(httpStatus.BAD_REQUEST, error.message,));
  }
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUserWithEmailAndPassword(email, password);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Login Successful', user));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  try {
    await userService.forgotPassword(email);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'New Password Send To Your Registered Email'));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});
const changePassword = catchAsync(async (req, res) => {
  const { oldpassword,newpassword } = req.body;
  try {
    await userService.changePassword(req.userId,oldpassword,newpassword);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Password Changed Successfully'));
  } catch (error) {
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});
const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUser(userId);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'fetched Successful', user));
  } catch (error) {
    console.log(error)
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});
const getAllUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.getAllUser();
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'fetched Successful', user));
  } catch (error) {
    console.log(error)
    res.status(error.statusCode).send(errorResponse(error.statusCode, error.message));
  }
});





module.exports = {
  registerUser,
  login,
  getUser,
  getAllUser,
  updateUser,
  forgotPassword,
  changePassword
};


