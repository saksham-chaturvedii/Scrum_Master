const scrum = require("../models/scrum");
const user = require("../models/user");
const assigned_BL_teams = require("../models/assigned_BL_Teams");
module.exports = async (req, res) => {
  try {
    if (await assigned_BL_teams)
      await assigned_BL_teams.create({
        attribute,
      });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
