const User = require("../models/user");
const { SECRET } = require("../config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      // console.log("Payload-> ",payload);
      // await User.findOne({ where: { email: payload.email } })
      await User.findOne({
        where: {
          where: {
            [Op.and]: [
              { teamName: payload.teamName },
              { username: payload.username },
            ],
          },
        },
      })
        .then((user) => {
          // console.log("User->", user.dataValues);
          if (user) {
            return done(null, user.dataValues);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log("passport.js err-> ", err);
          return done(null, false);
        });
    })
  );
};
