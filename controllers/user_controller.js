const User = require("../models/user_model");
const { v4: uuidv4 } = require("uuid");

const { getUser, setUser } = require("../service/auth");

async function userSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.json(req.body);
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("User", user);
  if (!user) return res.json({ error: "Invalid email or password" });

  const token = setUser(user);
  // res.cookie("uid", tokent);

  return res.json({ status: "Login Successfully", token });
}

module.exports = { userSignUp, userLogin };
