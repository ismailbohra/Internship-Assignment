const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Enrollment = sequelize.define("Enrollments", {
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Enrollment;
