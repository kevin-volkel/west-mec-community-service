const express = require("express");
const router = express.Router();

const { createService, getService, getServices, deleteService, updateService } = require("../controllers/serviceCon");
const auth = require("../middleware/auth");

router.route("/").post(auth, createService).get(getServices)
router.route("/:id").get(getService).delete(auth, deleteService).patch(auth, updateService);

module.exports = router;
