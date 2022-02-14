//! Environment Setup
require("express-async-errors");
require("dotenv").config();

//! App Cores
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload')
const connectDB = require("./db/connect");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//! Extra Secutiry
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

//! Routes
const serviceRouter = require("./routes/serviceRouter");
const authRouter = require("./routes/authRouter");
const uploadImage = require("./controllers/uploadController");

//! Middleware
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

//! SwaggerUI

//! Variable Declaration
const port = process.env.PORT || 3000;
const minutes = 1000 * 60;

app
  .set("trust proxy", 1)
  .use(
    rateLimiter({
      windowMs: 15 * minutes,
      max: 100,
    })
  )
  .use([express.urlencoded({ extended: true }), express.json()])
	.use(fileUpload({useTempFiles: true}))
  .use(helmet())
  .use(cors())
  .use(xss())
  .get("/", (req, res) => {
    res.send(" <h1> Welcome </h1>");
  })
  .use("/api/v1/service", auth, serviceRouter)

  .use("/api/v1/auth", authRouter)

  .post("/upload", uploadImage)

  .use('/login', express.static('./public/login'))
// .use(notFound)
// .use(errorHandler)

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`listening @ ${port}`));
  } catch (err) {
    console.error(err);
  }
};

startServer();
