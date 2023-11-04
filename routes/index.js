const express = require("express");
const router = express.Router();
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  var results = [];

  fs.createReadStream(path.join(__dirname, "../public/img/jpg/img-list.csv"))
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.forEach(async (data) => {
        console.log(data);
      });
      res.render("wedding", { title: "Nhan & Thy", data: results });
    });
});

module.exports = router;
