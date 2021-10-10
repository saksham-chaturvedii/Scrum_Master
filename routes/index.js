const router = require("express").Router();
const pool = require("../database/postgres");

// Bring in the User Registration function
const {
  userRegister,
  userLogin,
  userAuth,
  checkRole,
  editScrum,
} = require("../utils/Auth");
const studentScrumEntry = require("./studentScrumEntry");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req, req.body, res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req, req.body, res);
});

// If someone is using this route they cannot mention whose SCRUM details to be filled. They can only perform CRUD operation with their own data.
router.post("/student-scrum-entry", userAuth, (req, res) => {
  console.log("req.session scrum enrtry----------->", req.session);
  if (req.session.role != "Student") {
    res
      .status(500)
      .json("Unauthorized. This route is to edit a student's SCRUM data.");
  } else {
    pool.query(
      'INSERT into "scrum"(date, attendance, saw_last_lecture, tha, topics_to_cover, backlog_reason, class_rating, "userId") VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        req.body.date,
        req.body.attendance,
        req.body.saw_last_lecture,
        req.body.tha,
        req.body.topics_to_cover,
        req.body.backlog_reason,
        req.body.class_rating,
        req.session.username,
      ],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
});

// // Batch Leader Login Route
// router.post("/login-admin", async (req, res) => {
//   await userLogin(req.body, "admin", res);
// });

// // Profile Route
// router.get("/profile", userAuth, async (req, res) => {
//   return res.json(serializeUser(req.user));
// });

// // Users Protected Route
// router.get("/user-protected", userAuth, checkRole(["user"]), (req, res) => {
//   return res.json("Hello User");
// });

// // Admin Protected Route
// router.get("/admin-protected", userAuth, checkRole(["admin"]), (req, res) => {
//   return res.json("Hello Admin");
// });

// // Super Admin Protected Route
// router.get(
//   "/super-admin-protected",
//   userAuth,
//   checkRole(["superadmin"]),
//   (req, res) => {
//     return res.json("Hello Super Admin");
//   }
// );

// // Super Admin & Admin Protected Route
// router.get(
//   "/super-admin-and-admin-protected",
//   userAuth,
//   checkRole(["superadmin", "admin"]),
//   (req, res) => {
//     return res.json("Super Admin and Admin");
//   }
// );

module.exports = router;
