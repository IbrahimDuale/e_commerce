const admin = require("firebase-admin");
const config = admin.initializeApp();
const auth = admin.auth(config);
const functions = require("firebase-functions");
const express = require('express');
const router = express.Router();


// build multiple CRUD interfaces:
router.all('/:id', async (req, res) => {
    const body = JSON.parse(req.body);
    functions.logger.info("Hello logs!");
    functions.logger.info(`id: ${req.params.id}`);
    functions.logger.info(`body: ${body.hello}`);
    functions.logger.info(`query: ${req.query.color}`);
    let obj = { "completed": "completed" };
    const bucketName = "Hello!";

    res.json(obj);
});


// Expose Express API as a single Cloud Function:
exports.router = router;