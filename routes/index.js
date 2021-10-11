const router = require("express").Router();
const studentScrumEntry = require("../controllers/studentScrumEntry");
const addAttendance = require("../controllers/addAttendance");
const logout = require("../controllers/logout");
const viewTeamScrum = require("../controllers/viewTeamScrum");
const registeredUsers = require("../controllers/registeredUsers");
const checkAttendance = require("../controllers/checkAttendance");
const { userRegister, userLogin, userAuth } = require("../utils/auth");

// Users Registeration Route-["Student", "Vice Team Leader", "Team Leader","Batch Leader"]
router.post("/register-user", async (req, res) => {
  await userRegister(req, req.body, res);
});

// User Login Route-["Student", "Vice Team Leader", "Team Leader","Batch Leader"]
router.post("/login-user", async (req, res) => {
  await userLogin(req, req.body, res);
});

// User Logout Route
router.get("/logout-user", logout);

// View all the registered users
router.get("/registered-users", userAuth, registeredUsers);

// ENTER/UPDATE SCRUM, Permission to Role- "Student"
router.post(
  "/student-scrum-entry",
  userAuth,
  checkAttendance,
  studentScrumEntry
);

// Add Attendance, Permission to Role - "Vice Team Leader" or "Team Leader"
router.post("/update-attendance", userAuth, addAttendance);

// View SCRUM details of any team member. If date is not provided, all the stored SCRUM data of the member will be displayed.
router.post("/view-team-scrum", userAuth, viewTeamScrum);

module.exports = router;
