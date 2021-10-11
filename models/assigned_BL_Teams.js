const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const assigned_batch_leader_teams = sequelize.define(
  "assigned_batch_leader_teams",
  {
    batch_leader_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigned_teams: {
      type: DataTypes.ARRAY,
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

module.exports = assigned_batch_leader_teams;
