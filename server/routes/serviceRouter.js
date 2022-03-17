const express = require("express");
const router = express.Router();

const { createService, getService, getServices, deleteService, updateService } = require("../controllers/serviceCon");
const { authMiddleware } = require("../middleware/auth");

router.route("/").post(authMiddleware, createService).get(authMiddleware, getServices)
router.route("/:id").get(getService).delete(authMiddleware, deleteService).patch(authMiddleware, updateService);

module.exports = router;
