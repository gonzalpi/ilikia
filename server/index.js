// server/index.js

const express = require("express");
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

const app = express()
// app.use(express.static(path.resolve(__dirname, '../frontend/hospitalClient/build')));

// localhost:3001/api/exam?id=1&personal=aaa&paciente=bbb&medico=ccc
app.get("/api/exam", (req, res) =>
{
    let query = "SELECT * FROM examen";
    let first = true;
    if (req.query.id ||
        req.query.personal ||
        req.query.paciente ||
        req.query.medico)
        query += " WHERE";
    if (req.query.id)
    {
        if (!first) query += " AND";
        first = false;
        query += ` id_examen=${req.query.id}`;
    }
    if (req.query.personal)
    {
        if (!first) query += " AND";
        first = false;
        query += ` usuario_personal='${req.query.personal}'`;
    }
    if (req.query.paciente)
    {
        if (!first) query += " AND";
        first = false;
        query += ` usuario_paciente='${req.query.paciente}'`;
    }
    if (req.query.medico)
    {
        if (!first) query += " AND";
        first = false;
        query += ` usuario_medico='${req.query.medico}'`;
    }
    query += ";";
    console.log(query);
    con.query(
        query,
        (err, results, fields) =>
        {
            err ?
            res.send(err) :
            res.send(results);
        }
    )
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
