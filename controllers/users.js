const db = require("../models");
const validate = require("../middleware/validator");
const { userValidation } = require("../middleware/validator-registration");
const User = db.users;

module.exports = (app) => {
  app.post("/users", userValidation(), validate, async (req, res) => {
    try {
      const { username, email } = req.body;

      let user = new User({
        username: username,
        email: email,
        score: 0,
      });

      let data = await user.save();

      return res.status(201).json(data);
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  app.get("/users/score", async (req, res) => {
    try {
      const users = await User.find({}, "_id username score").sort({
        score: -1,
      });
      if (users.length < 0) {
        return res.status(500).json(err);
      }
      return res.status(200).json(users.slice(0, 5));
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  app.patch("/users/:id/score", async (req, res) => {
    try {
      const { id } = req.params;
      const { score } = req.body;

      if (!id) {
        return res.send(403).json({
          message: "No user id provided",
        });
      }

      let user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(500).json(err);
      }

      if (score > user.score) {
        user.score = score;
        await user.save();
        return res.status(200).json({ isScoreChanged: true });
      }
      return res.status(200).json({ isScoreChanged: false });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
