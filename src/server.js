// Use Express
var config = require('./config');

var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");

// Create new instance of the express server
var app = express();

var mysql = require('mysql2'); // import mysql module

// setup database
db = mysql.createConnection({
    host: process.env.MYSQLHOST || config.mysqlHost,
    port: process.env.MYSQLPORT || config.mysqlPort,
    user: process.env.MYSQLUSER || config.mysqlUser,
    password: process.env.MYSQLPASSWORD || config.mysqlPassword,
    database: 'reposgit',
    insecureAuth : true
  })

db.connect(function(err) {
if (err) throw err;
console.log("Connecté à la base de données MySQL!");
});

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/* GET home page. */
app.get('/api/randomrepo', function(req, res, next) {
    // res.render('layout', { title: 'Movieseat' });
  
    db.connect();
  
      db.query("SELECT * FROM repos AS r1 JOIN (SELECT (RAND() * (SELECT MAX(id) FROM repos)) AS id) AS r2 WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT 1", function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        console.log(results);
        res.status(200).json(results);
        });
});
