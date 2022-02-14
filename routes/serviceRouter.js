const express = require("express");
const router = express.Router();

const { createService, getService, getServices, deleteService, updateService } = require("../controllers/serviceCon");

router.route("/").post(createService).get(getServices)
router.route("/:id").get(getService).delete(deleteService).patch(updateService);

module.exports = router;
