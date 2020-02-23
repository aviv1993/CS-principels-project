const { handleData } = require("./src/server");

/*const functions = require("firebase-functions");
const { handleData } = require("./src/server");
exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log(request);
  console.log(request.body);
  let res = handleData(request.body);
  console.log(res);
  response.set("Access-Control-Allow-Origin", "*");
  response.status(200).send(res);
});
*/
const express = require("express");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors");
const api = express();

handle = (req, res) => {
  const data = handleData(req.body);
  res.send(data);
};
// Automatically allow cross-origin requests
api.use(cors({ origin: true }));
api.post("/", handle);
api.post("/graph-controller", handle);
exports.api = functions.https.onRequest(api);
