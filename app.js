const express = require("express");
const app = express("");

const readCSV = require("./api/routes/readCSV");
const checkDeployment=require("./api/routes/deployementRoute");

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
