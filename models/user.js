const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const user = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Student",
      type: DataTypes.ENUM(
        "Student",
        "Vice Team Leader",
        "Team Leader",
        "Batch Leader"
      ),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = user;
