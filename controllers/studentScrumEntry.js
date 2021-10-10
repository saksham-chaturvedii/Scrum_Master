const scrum = require("../models/scrum");
const { Op, where } = require("sequelize");

module.exports = async (req, res) => {
  try {
    if (req.session.user.role != "Student") {
      res
        .status(500)
        .json("Unauthorized. This route is to edit a student's SCRUM data.");
    } else {
      // 1. scrum data for user 1 already does not exist for current date
      if (
        await scrum.findOne({
          where: {
            [Op.and]: [
              { userId: req.session.user.id },
              { date: req.body.date },
            ],
          },
        })
      ) {
        // update
        const updatedResult = await scrum.update(
          {
            date: req.body.date,
            attendance: req.body.attendance,
            saw_last_lecture: req.body.saw_last_lecture,
            tha: req.body.tha,
            topics_to_cover: req.body.topics_to_cover,
            backlog_reason: req.body.backlog_reason,
            class_rating: req.body.class_rating,
            userId: req.session.user.id,
          },
          { where: { userId: req.session.user.id } }
        );
        if (updatedResult) {
          res
            .status(200)
            .json({ message: `SCRUM data updated.`, success: true });
        }
      } else {
        const result = await scrum.create({
          date: req.body.date,
          attendance: req.body.attendance,
          saw_last_lecture: req.body.saw_last_lecture,
          tha: req.body.tha,
          topics_to_cover: req.body.topics_to_cover,
          backlog_reason: req.body.backlog_reason,
          class_rating: req.body.class_rating,
          userId: req.session.user.id,
        });

        res.status(200).json(result);
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
