const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const { SECRET } = require("../config/index");
const { Op } = require("sequelize");

/**
 * To register the user (Team Member, Vice Team Leader, Team Leader, Batch Leader)
 */

const userRegister = async (userDets, res) => {
  try {
    const { email, username, teamName, role, password } = userDets;
    // Validate the username
    let usernameNotTaken = await validateUsername(username, teamName);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `A team member with the same username already exists; no two members in a team can have the same username.`,
        success: false,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      });
    }

    // Get the hashed password
    const hashedPassword = await bcrypt.hash(password, 12);
    // create a new user
    const newUser = await User.create({
      ...userDets,
      hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "You have been registered successfully.",
      success: true,
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false,
      err: err,
    });
  }
};

const validateUsername = async (username, teamName) => {
  let user = await User.findOne({
    where: { [Op.and]: [{ teamName: teamName }, { username: username }] },
  });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ where: { email } });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userRegister,
  serializeUser,
};
