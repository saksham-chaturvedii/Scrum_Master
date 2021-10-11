const { DataTypes, col, literal } = require("sequelize");
const sequelize = require("../database/index");
const user = require("./user");
const scrum = sequelize.define(
  "scrum",
  {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    attendance: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Absent",
    },
    saw_last_lecture: {
      //   type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    tha: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    topics_to_cover: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    backlog_reason: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    class_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: true,
      defaultValue: new Date(),
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      allowNull: true,
      defaultValue: new Date(),
      type: DataTypes.DATEONLY,
    },
  },
  {
    freezeTableName: true,
  }
);
user.hasMany(scrum);
scrum.belongsTo(user, {
  foreignKey: "userId",
  defaultValue: 0,
});

module.exports = scrum;
