const User = require("../models/User");
const bcrypt = require("bcrypt");
const isEmail = require('validator/lib/isEmail');


const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(401).send("Include a username AND password")
  if(password.length < 8) return res.status(401).send('Password must be at least 8 characters long')

  try{
    const userLogin = await User.findOne({ username });
  
    if (!userLogin) return res.status(401).send('Invalid Credentials')
  
    const isPassCorrect = await userLogin.comparePassword(password);
  
    if (!isPassCorrect) return res.status(401).send('Invalid Credentials')
    const token = userLogin.createJWT();
    res
      .status(200)
      .json({ user: { username: userLogin.username, id: userLogin._id }, token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error')
  }
};

const register = async (req, res) => {
  const {email, username, password} = req.body

  if (!isEmail(email)) return res.status(401).send('Invalid Email');
  if (password.length < 8)
    return res
      .status(401)
      .send('Password must be at least 8 characters long');

  try{
    let user;
    user = await User.findOne({ email: email.toLowerCase()})
    if(user) return res.status(401).send('Email already in use');

    const newUser = await User.create(req.body);
    const token = newUser.createJWT();
    res.status(200).json({ user: { username: newUser.username }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error')
  }
};

const getUsers = async (req, res) => {
  const { permission } = req.user;
  if (permission !== "teacher") return res.status(401).send('Invalid Permissions')
  const users = await User.find({});
  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { permission } = req.user;
  if (permission !== "teacher") return res.status(401).send('Invalid Permissions')
  const user = await User.findById(id);
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { permission } = req.user;
  if (permission !== "teacher") return res.status(401).send('Invalid Permissions')
  const deleted = await User.findByIdAndDelete(id);
  res.status(200).send(deleted);
};

const updateUser = async (req, res) => {
  const { id: paramID } = req.params;
  const { permission, userID, username } = req.user;
  const {
    password: newPass,
    username: newUsername,
    email: newEmail,
    permission: newPermission,
  } = req.body;

  const userObject = await User.findById(paramID);

  if (permission !== "teacher") {
    const reqPerm = req.body.permission;
    if (reqPerm) {
      if (userObject.permission !== reqPerm) return res.status(401).send('Invalid Permissions')
    }
    if (userID !== paramID) {
      console.log(userID, paramID);
      return res.status(401).send('Invalid Permissions')
    }
  }

  const updatedPassword = req.body.password;

  if (updatedPassword) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      bcrypt.genSaltSync()
    );
  }

  const updatedUser = await User.findByIdAndUpdate(paramID, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedUser);
};

module.exports = { login, register, getUsers, getUser, deleteUser, updateUser };
