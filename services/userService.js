const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { jwtEncode } = require("../middelwares/authorization");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const User = require("../models/user");  // Assuming this is your Mongoose User model
const sendEmail = require("../middelwares/email");

const registerUser = async (userBody) => {
  try {
    const { name, email, password, role } = userBody;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const templatePath = './EmailTemplates/UserRegistration.html';
    const replacements = {
      '{{USERNAME}}': name,
    };

    const send = await sendEmail(email, "User Registration", templatePath, replacements);
    if (!send.status) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    }
    return { emailStatus: "Email sent successfully" }; 

    const newUser = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });


    return { newUser, emailStatus: "Email sent successfully" }; 
  } catch (error) {
    console.error("User create service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUser = async (userBody) => {
  try {
    const { name, email, password, id, role } = userBody;
    const user = await User.findById(id);
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

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.NOT_FOUND, "Invalid email or password");
    }

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

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }
    const password = Math.random().toString(36).slice(-8);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    const templatePath = './EmailTemplates/ForgotPassword.html';
    const replacements = {
      '{{USERNAME}}': user.name,
      '{{TEMPORARY_PASSWORD}}': password
    };

    const send = await sendEmail(user.email, "Forgot Password", templatePath, replacements);
    if (!send.status) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    }

  } catch (error) {
    console.error("Login by email service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not exist");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid old password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    const templatePath = './EmailTemplates/PasswordChange.html';
    const replacements = {
      '{{USERNAME}}': user.name,
    };

    const send = await sendEmail(user.email, "Password Change Confirmation", templatePath, replacements);
    if (!send.status) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, send.msg);
    }

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
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    console.error("get user service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (!users) {
      throw new ApiError(httpStatus.NOT_FOUND, "Users not found");
    }

    return { users };
  } catch (error) {
    console.error("get users service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  registerUser,
  loginUserWithEmailAndPassword,
  getUser,
  getAllUsers,
  updateUser,
  forgotPassword,
  changePassword
};
