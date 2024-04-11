const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Course = db.define("Course", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
    allowNull: false,
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
module.exports = Course;
