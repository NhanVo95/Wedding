var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("invitation", {
        title: "Nhan & Thy",
        invitation: "../img/invitation/invitation.png",
    });
});

module.exports = router;
