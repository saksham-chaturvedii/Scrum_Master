const router = require("express").Router();
const studentScrumEntry = require("../controllers/studentScrumEntry");
const {
  userRegister,
  userLogin,
  userAuth,
  registeredUsers,
} = require("../utils/Auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req, req.body, res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req, req.body, res);
});

// Check all Registered Users
router.get("/registered-users", registeredUsers);

// ENTER SCRUM, Role- "Student"
router.post("/student-scrum-entry", userAuth, studentScrumEntry);

module.exports = router;
