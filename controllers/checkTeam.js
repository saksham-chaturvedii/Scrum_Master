const user = require("../models/user");

module.exports = async (req, res) => {
  const assigned_teams = req.body.assigned_teams;
  console.log("ass teams->>>", assigned_teams);
  //   if()
  await user.findAll({ attributes: [`teamName`] }).then((result) => {
    result = Object.assign({}, result);
    console.log("result---->", result);
  });
};

// check ig team mention in post req exixts or not
