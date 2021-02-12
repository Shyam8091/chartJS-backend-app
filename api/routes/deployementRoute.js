/**
 * @author SShyam
 * @description route to check if deployment passes
 * @returns String
 */
const express = require("express");
const router = express.Router();
var fs = require("fs");
const cors = require("cors");

router.use(cors());

router.get("/", async function fetchData(req, res) {
  
  res.status(200).end(JSON.stringify("Code is deployed"));
});
module.exports = router;
