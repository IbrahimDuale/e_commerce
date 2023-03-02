const functions = require("firebase-functions");
const express = require('express');
const app = express();
// Automatically allow cross-origin requests
const cors = require('cors');
app.use(cors({ origin: true }));
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



const auth = require("./auth.js");
app.use("/auth", auth.router);

exports.api = functions.https.onRequest(app);