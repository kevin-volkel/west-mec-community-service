//* Express App Setup
const express = require('express');
const { connectDB } = require('./server/util/connect');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

//! Extra Secutiry
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

//* Next App Setup
const next = require('next');

//! create a check for development vs production
const dev = process.env.NODE_ENV !== 'production';

//! there are giant error warnings that pop up when in development
const nextApp = next({ dev });

//! this is a built-in next router that will handle all requests made to the server
const handler = nextApp.getRequestHandler();

const minutes = 1000 * 60

//* Middlewares
app.use(express.json());
// app.set('trust proxy', 1)
//   .use(
//     rateLimiter({
//       windowMs: 15 * minutes,
//       max: 100
//     })
//     )
app.use(fileUpload({ useTempFiles: true }));
// app.use(helmet())
// app.use(cors())
// app.use(xss())


//! ROUTERS
const authRouter = require('./server/routes/authRouter')
const serviceRouter = require('./server/routes/serviceRouter')
const uploadImage = require('./server/controllers/uploadController')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/service', serviceRouter)
app.post('/upload', uploadImage)

connectDB();


nextApp.prepare().then(() => {
  app.all('*', (req, res) => handler(req, res));
  app.listen(PORT, (err) => {
    if (err) console.error(err);
    else console.log(`Server listening @ ${PORT}`);
  });
});
