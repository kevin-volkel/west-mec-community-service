const Service = require("../models/Service");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const createService = async (req, res) => {
	const user = req.user
	console.log(user)
  const newService = await Service.create({...req.body, userID: user.userID, });
  res.status(StatusCodes.OK).json({ msg: "Success", service: newService });
};

const getServices = async (req, res) => {
  const services = await Service.find();
  if (!services) {
    throw new BadRequestError("There are currently no services");
  }
  res.status(StatusCodes.OK).json({services});
};

const getService = async (req, res) => {
  const { id } = req.params;
  const services = await Service.findById(id);
  if (!services) {
    throw new BadRequestError("Could not find any services with that ID");
  }
  res.status(StatusCodes.OK).json(services);
};

const deleteService = async (req, res) => {
  const { permission } = req.user;
  const { id } = req.params;

  const serviceCheck = await Service.findById(id)

  if (permission === "student" && userID !== serviceCheck.userID) {
    throw new UnauthError("You are not authorized to do this");
  }
  const services = await Service.findByIdAndDelete(id);

  if (!services) {
    throw new BadRequestError("There is no service with that ID");
  }
  res.status(StatusCodes.OK).json(services);
};

const updateService = async (req, res) => {
  const { permission, userID} = req.user;
  const { id } = req.params;

	const serviceCheck = await Service.findById(id)

  if (permission === "student" && userID !== serviceCheck.userID) {
    throw new UnauthError("You are not authorized to do this");
  }
  const services = await Service.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

  if (!services) {
    throw new BadRequestError("There is no service with that ID");
  }
  res.status(StatusCodes.OK).json(services);
};

module.exports = { createService, getService, getServices, deleteService, updateService };