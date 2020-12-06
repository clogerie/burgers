// Import orm.js into burger.js
var orm = require("../../burgers/config/orm.js");

var burger = {
    selectAll: function(cb) {
      orm.selectAll("burgers", function(res) {
        cb(res);
      });
    },

    // The variables cols and vals are set as arrays.
    insertOne: function(cols, vals, cb) {
        orm.create("burgers", cols, vals, function(res) {
          cb(res);
        });
      },

      // ObjColVals is an object that specifies colums as object keys with cooresponding values.
      updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
          cb(res);
        });
      },

      deleteOne: function(condition, cb) {
        orm.deleteOne("burgers", condition, function(res) {
          cb(res);
        });
      }
};

// Export the database functions for the controller (burgers_Controller.js).
module.exports = burger;