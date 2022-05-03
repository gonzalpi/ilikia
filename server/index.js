// server/index.js

// const express = require("express");
const mysql = require("mysql2");
// const path = require("path");

const PORT = process.env.PORT || 3001;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ilikia",
    socketPath: "/var/lib/mysql/mysql.sock"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query(
    "SHOW TABLES;",
    (err, results, fields) => console.log(results)
)

// const app = express()
// app.use(express.static(path.resolve(__dirname, '../frontend/hospitalClient/build')));