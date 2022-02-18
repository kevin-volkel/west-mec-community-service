const Service = require("../models/Service");


const createService = async (req, res) => {
	const user = req.user
	console.log(req.user)
  const newService = await Service.create({...req.body, userId: user.userId, });
  res.status(200).json({ msg: "Success", service: newService });
};

const getServices = async (req, res) => {
  const services = await Service.find();
  if (!services) return res.status(401).send('Bad Request')
  res.status(200).json({services});
};

const getService = async (req, res) => {
  const { id } = req.params;
  const services = await Service.findById(id);
  if (!services) return res.status(401).send('Bad Request')
  res.status(200).json(services);
};

const deleteService = async (req, res) => {
  const { permission } = req.user;
  const { id } = req.params;

  const serviceCheck = await Service.findById(id)

  if (permission === "student" && userId !== serviceCheck.userId) return res.status(401).send('Invalid Permissions')
  const services = await Service.findByIdAndDelete(id);

  if (!services) return res.status(401).send('Bad Request')
  res.status(200).json(services);
};

const updateService = async (req, res) => {
  const { permission, userId} = req.user;
  const { id } = req.params;

	const serviceCheck = await Service.findById(id)

  if (permission === "student" && userId !== serviceCheck.userId) return res.status(401).send('Invalid Permissions')
  const services = await Service.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

  if (!services) return res.status(401).send('Bad Request')
  res.status(200).json(services);
};

module.exports = { createService, getService, getServices, deleteService, updateService };