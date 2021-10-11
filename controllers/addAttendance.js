const scrum = require("../models/scrum");
const user = require("../models/user");

module.exports = async (req, res) => {
  try {
    // check if member editing is VTL/TL or not
    if (
      req.session.user.role !== "Vice Team Leader" &&
      req.session.user.role !== "Team Leader"
    ) {
      res
        .status(401)
        .json(
          "Unauthorized. This route is to add attendance to a student's SCRUM data and can only be accessed by Team Leader or Vice Team Leader of that team."
        );
    } else {
      const member_username = await user.findOne({
        where: { username: req.body.member_username },
      });

      // check given member's username (whose attendance has to be marked), exists in same team or not
      if (member_username) {
        await scrum
          .create(
            {
              attendance: req.body.attendance,
              userId: member_username.dataValues.id,
            },
            { where: { userId: member_username.dataValues.id } }
          )
          .then((result) => {
            result
              ? res.status(200).send("Attendance marked!")
              : res.status(424).send("Error Occurred.");
          });
      }
    }
  } catch (err) {
    console.log("---------------------------------------", err);
    res.status(400).send(err);
  }
};
