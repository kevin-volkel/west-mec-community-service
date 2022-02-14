const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-error");
const NotFoundError = require("./not-found");
const UnauthError = require("./unauth");

module.exports = {BadRequestError, CustomAPIError, UnauthError, NotFoundError}