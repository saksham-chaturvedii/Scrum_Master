const scrum = require("../models/scrum");
const { Op, where } = require("sequelize");

module.exports = async (req, res, next) => {
  try {
    await scrum
      .findOne({
        where: {
          [Op.and]: [
            { attendance: "Present" },
            { userId: req.session.user.id },
          ],
        },
      })
      .then((result) => {
        if (result) {
          console.log("result->>>>>>", result);
          next();
        } else {
          console.log("else result->>>>>>", result);
          res.status(400).json({
            message: `You cannot enter SCRUM data until your attendance has been marked as "Present".`,
          });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
