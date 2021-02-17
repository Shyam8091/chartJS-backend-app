const express = require("express");
const app = express("");

const readCSV = require("./api/routes/readCSV");
const checkDeployment=require("./api/routes/deployementRoute");
var cron = require('node-cron');
 cron.schedule('*/3 * * * * *', () => {
 function fetchData(req, res) {
    console.log("called every 3 sec");
  };
  fetchData();
});

app.use("/", checkDeployment);
app.use("/readCSV", readCSV);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
