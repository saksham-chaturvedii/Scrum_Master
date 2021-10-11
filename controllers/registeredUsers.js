const user = require("../models/user");
module.exports = async (req, res) => {
  try {
    await user
      .findAll({
        attributes: [`name`, `username`, `teamName`, `role`],
        order: ["id"],
      })
      .then(function (users) {
        res.status(200).json(users);
      });
  } catch (err) {
    console.warn("Error in retrieving user data.", err);
  }
};
