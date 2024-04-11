const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { jwtEncode } = require("../middelwares/authorization");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const User = require("../models/user");
const Enrollment = require("../models/Enrollment");

const registerUser = async (userBody) => {
  try {
    const { name, email, password,role } = userBody;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    console.error("User create service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const updateUser = async (userBody) => {
  try {
    const { name, email, password, id,role } = userBody;
    const user = await User.findByPk(id);
    if (!user) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User Not Found");
    }
    user.name = name || user.name;
    user.role = role || user.role;
    user.email = email || user.email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();

    return user;
  } catch (error) {
    console.error("User update service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const tokenExpiringAt = moment().add(30, "seconds").unix();

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.NOT_FOUND, "Invalid email or password");
    }
    // console.log(user.id,user.role);
    const token = jwtEncode(user.id, user.role);

    return {
      user,
      token,
      tokenExpiringAt,
    };
  } catch (error) {
    console.error("Login by email service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const getUser = async (userId) => {
  try {
    if (!userId) {
      throw new ApiError(httpStatus.NOT_FOUND, "userId Not Found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const enrollments = await Enrollment.findAll({ where: { userId } });
    return {
      ...user.dataValues,
      enrollments,
    };
  } catch (error) {
    console.error("get user service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const getAllUser = async () => {
  try {
    const user = await User.findAll();
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return { user };
  } catch (error) {
    console.error("get user service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  registerUser,
  loginUserWithEmailAndPassword,
  getUser,
  getAllUser,
  updateUser,
};
