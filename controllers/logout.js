module.exports = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send("Redis session destroyed successfully.");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
