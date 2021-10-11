const scrum = require("../models/scrum");
const { Op, where } = require("sequelize");

module.exports = async (req, res) => {
  try {
    // If scrum data for today extists
    console.log("re", req.session);
    // if (
    await scrum.findOne({
      where: {
        [Op.and]: [
          { userId: req.session.user.id },
          { date: req.session.user.createdAt },
        ],
      },
    });
    // )
    {
      // update
      await scrum
        .update(
          {
            date: req.session.user.createdAt,
            saw_last_lecture: req.body.saw_last_lecture,
            tha: req.body.tha,
            topics_to_cover: req.body.topics_to_cover,
            backlog_reason: req.body.backlog_reason,
            class_rating: req.body.class_rating,
            userId: req.session.user.id,
          },
          { where: { userId: req.session.user.id } }
        )
        .then(() => {
          res
            .status(200)
            .json({ message: `SCRUM data updated.`, success: true });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
