const express = require("express");
const Comment = require("../models/Comment");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    var comments = await Comment.find();
    res.json(comments);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
});

router.post("/", (req, res) => {
  var comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });

  comment
    .save()
    .then(res.json("User added!"))
    .catch((err) => console.log(err));
});

module.exports = router;
