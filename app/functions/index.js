

const api = require("./api.js");
exports.api = api.api;

// const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// exports.test = functions.
//   .runWith({
//     enforceAppCheck: true  // Requests without valid App Check tokens will be rejected.
//   })
//   .https.onCall((data, context) => {
//   context.app will be undefined if the request doesn't include an
//   App Check token. (If the request includes an invalid App Check
//   token, the request will be rejected with HTTP error 401.)
//   if (context.app == undefined) {
//     throw new functions.https.HttpsError(
//         'failed-precondition',
//         'The function must be called from an App Check verified app.')
//   }

//   // Your function logic follows.
// });


