const { DataTypes, col, literal } = require("sequelize");
const sequelize = require("../database/index");
const scrum = sequelize.define(
  "scrum",
  {
    attendance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sawLastLecture: {
      //   type: DataTypes.STRING,
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topicsToCover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backlogReason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = scrum;
