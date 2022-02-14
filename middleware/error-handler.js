const { StatusCodes } = require("http-status-codes");

module.exports = (err, req, res, next) => {
  // Default
  let returnError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Oops, something went wrong"
  };

  // Validation error
  if (err.name === "ValidationError") {
    returnError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    returnError.statusCode = 400;
  }

  // Type cast error
  if (err.name === "CastError") {
    returnError.msg = `No items with id ${err.value}`;
  }

  if (err.code && err.code === 11000) {
    // Duplication error
    returnError.msg = `Field ${Object.keys(err.keyValue)} ${Object.value(
      err.keyValue
    )} already exists`;
  }

  return res.status(returnError.statusCode).json({ msg: returnError.msg });
};