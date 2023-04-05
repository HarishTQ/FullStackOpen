const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, name, hashedPassword });
  const result = await newUser.save();
  res.json(result).status(201);
});

module.exports = userRouter;
