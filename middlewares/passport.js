const User = require("../models/user");
const { SECRET } = require("../config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Op } = require("sequelize");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findOne({
        where: {
          [Op.and]: [
            { teamName: payload.teamName },
            { username: payload.username },
          ],
        },
      })
        .then((user) => {
          if (user) {
            return done(null, user.dataValues);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );
};
