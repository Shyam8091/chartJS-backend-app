/**
 * @author SShyam
 * @description this route will calculate the total number of each Type{A,B,C,D,E} present in a specific month from the csv file
 * @returns array of objects which contains the information of name of the month and count of A,B,C,D,E
 */
const express = require("express");
const router = express.Router();
var fs = require("fs");
const cors = require("cors");
const { filePath } = require("../../config");
router.use(cors());
const result = [];
var uniqueMonth = [];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
router.get("/", async function fetchData(req, res) {
  var data = fs.readFileSync(filePath, "utf8");
  const rows = data.split("\n").slice(1);

  var count_A = 0;
  var count_B = 0;
  var count_C = 0;
  var count_D = 0;
  var count_E = 0;
  var Type_A = "A";
  var Type_B = "B";
  var Type_C = "C";
  var Type_D = "D";

  rows.forEach((ele) => {
    const column = ele.split(",");
    const initialDate = column[3];
    var date = new Date(initialDate);
    var initailMonth = ("0" + (date.getMonth() + 1)).slice(-2);

    if (!uniqueMonth.includes(initailMonth) && initailMonth != "aN") {
      rows.forEach((element) => {
        const nestedColumnValue = element.split(",");
        const nestedType = nestedColumnValue[1];
        const nestedDate = nestedColumnValue[3];

        var date = new Date(nestedDate);
        var nestedMonth = ("0" + (date.getMonth() + 1)).slice(-2);

        if (initailMonth === nestedMonth) {
          if (nestedType === Type_A) {
            count_A++;
          } else if (nestedType === Type_B) {
            count_B++;
          } else if (nestedType === Type_C) {
            count_C++;
          } else if (nestedType === Type_D) {
            count_D++;
          } else {
            count_E++;
          }
        }
      });
      var monthData = new Object();
      if (initailMonth.startsWith(0)) {
        monthData.month = months[initailMonth.slice(-1)];
      } else {
        monthData.month = months[initailMonth];
      }

      (monthData.A = count_A),
        (monthData.B = count_B),
        (monthData.C = count_C),
        (monthData.D = count_D),
        (monthData.E = count_E),
        uniqueMonth.push(initailMonth),
        result.push(monthData);
      (monthData = {}),
        (count_A = 0),
        (count_B = 0),
        (count_C = 0),
        (count_D = 0),
        (count_E = 0);
    }
  });

  console.log("result", result);

  res.status(200).end(JSON.stringify(result));
});
module.exports = router;
