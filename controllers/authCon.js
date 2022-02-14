const User = require("../models/User");
const { BadRequestError, UnauthError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide both a username and password");
  }

  const userLogin = await User.findOne({ username });

  if (!userLogin) {
    throw new UnauthError("Invalid Credentials");
  }

  const isPassCorrect = await userLogin.comparePassword(password);

  if (!isPassCorrect) {
    throw new UnauthError("Incorrect Username or Password");
  }
  const token = userLogin.createJWT();
  res
    .status(200)
    .json({ user: { username: userLogin.username, id: userLogin._id }, token });
};

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  const { username, email, password } = newUser;
  if(!username || !email || !password) throw new BadRequestError("Some piece of info is missing")
  const token = newUser.createJWT();
  res.status(200).json({ user: { username: newUser.username }, token });
};

const getUsers = async (req, res) => {
  const { permission } = req.user;
  if (permission !== "teacher") {
    throw new UnauthError("You do not have permission to view this page");
  }
  const users = await User.find({});
  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { permission } = req.user;
  if (permission !== "teacher") {
    throw new UnauthError("You do not have permission to view this page");
  }
  const user = await User.findById(id);
  res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { permission } = req.user;
  if (permission !== "teacher") {
    throw new UnauthError("You do not have permission to view this page");
  }
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
      if (userObject.permission !== reqPerm) {
        throw new UnauthError(
          "You do not have permission to change permissions."
        );
      }
    }
    if (userID !== paramID) {
      console.log(userID, paramID);
      throw new UnauthError(
        `You do not have permission to change that user's information.`
      );
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

  res.status(StatusCodes.OK).json(updatedUser);
};

module.exports = { login, register, getUsers, getUser, deleteUser, updateUser };
