const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const { SECRET } = require("../config/index");
const { Op, where } = require("sequelize");

/**
 * USER REGISTRATION
 * Roles-> (Student, Vice Team Leader, Team Leader, Batch Leader)
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
      password: hashedPassword,
    });
    // console.log("-------------------New User-> ", newUser.toJSON());

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

/**
 *  USER LOGIN
 */

const userLogin = async (userCreds, res) => {
  let { username, password } = userCreds;

  // Check if user is present in the database
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false,
    });
  }

  // Verify the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        teamName: user.teamName,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      teamName: user.teamName,
      token: `Bearer ${token}`,
      expiresIn: 168, //hours
    };

    return res.status(200).json({
      ...result,
      message: "Yo, you are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false,
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
};
