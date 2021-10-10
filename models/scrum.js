const { DataTypes, col, literal } = require("sequelize");
const sequelize = require("../database/index");
const scrum = sequelize.define(
  "scrum",
  {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saw_last_lecture: {
      //   type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
    },
    tha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topics_to_cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backlog_reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: true,
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = scrum;
