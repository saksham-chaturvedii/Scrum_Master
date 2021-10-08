const router = require("express").Router();
const pool = require("../database/postgres");
/* GET users listing. */
router.get("/", function (req, res) {
  console.log("here");
  pool.query(
    'SELECT "name", "username", "teamName", "role" FROM "user" ORDER BY "teamName" ASC',
    (err, result) => {
      if (err) {
        console.log("if err ", err);
        throw err;
      } else {
        console.log("else");
        res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
