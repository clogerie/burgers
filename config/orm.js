// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Helper function for SQL syntax.
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }
    return arr.toString();
};

// Object for all our SQL statement functions.
// Function that returns all table entries.
var orm = {
    selectAll: function(tableInput, cb) {
        // Query string to that returns all rows from target table.
        var queryString = "SELECT * FROM " + tableInput + ";";
        // Database query.
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          // Return results in callback function.
          cb(result);
        });

},

// Function that inserts a single table entry.
insertOne: function(table, cols, vals, cb) {
    // Create query string that inserts a single row into the target table.
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    // Data base query.
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      // Return results in callback function
      cb(result);

    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  deleteOne: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;




