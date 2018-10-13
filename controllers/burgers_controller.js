var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
        // res.render("form");
        // res.sendFile(__dirname + "../views/index.handlebars");
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne([ 
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {
        //DON'T TOUCH THIS. LEAVE IT ALONE.
        // res.redirect("/");
        // return res.json(data)
        res.json({ id: result.insertId });
        // res.render("index", hbsObject);
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function() {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
          }
        // res.redirect("/");
    });
    // console.log(error);
});

module.exports = router;