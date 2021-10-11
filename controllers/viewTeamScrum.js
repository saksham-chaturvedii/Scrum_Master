const user = require("../models/user");
const scrum = require("../models/scrum");

module.exports = async (req, res) => {
  try {
    if (req.body.scrum_date) {
      const { scrum_date } = req.body;
      const member_username = await user.findOne({
        where: { username: req.body.member_username },
      });
      await scrum
        .findAll({
          where: {
            createdAt: scrum_date,
            userId: member_username.dataValues.id,
          },
          order: ["id"],
        })
        .then((result) => {
          res.status(200).json(result);
        });
    } else {
      const member_username = await user.findOne({
        where: { username: req.body.member_username },
      });
      await scrum
        .findAll({
          where: {
            userId: member_username.dataValues.id,
          },
          order: ["id"],
        })
        .then((result) => {
          res.status(200).json(result);
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
