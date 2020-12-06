var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../../burgers/models/burger.js");

// Create all the routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      res.json({ burgers: data });
    });
  });

  router.post("/burgers", function(req, res) {
    burger.insertOne([
      "burger_name"
    ], [
      req.body.burger_name,
    ], function(data) {
        res.redirect("/");
    });

  });

  router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne({
      devoured: true
    }, condition, function(data){
        res.redirect("/");
    });

  });
  
// Export routes for server.js to use.
module.exports = router;