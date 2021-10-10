const { DataTypes, col, literal, BelongsTo } = require("sequelize");
const sequelize = require("../database/index");
const user = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      // defaultValue: col("teamName"),
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
      // unique: true,
      // prinaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = user;
