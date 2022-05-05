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

/*
localhost:3001/api/exam
// PARÁMETROS OPCIONALES
    id=1
    personal=aaa
    paciente=bbb
    medico=ccc
*/
app.get("/api/exam", (req, res) =>
{
    let query = "SELECT * FROM examen"
        + (req.query.id || req.query.personal ||
        req.query.paciente || req.query.medico ?
            " WHERE 1" : "")
        + (req.query.id ?
            ` AND id_examen=${req.query.id}` : "")
        + (req.query.personal ?
            ` AND usuario_personal='${req.query.personal}'` : "")
        + (req.query.paciente ?
            ` AND usuario_paciente='${req.query.paciente}'` : "")
        + (req.query.medico ?
            ` AND usuario_medico='${req.query.medico}'` : "")
        + ";";
    console.log(query);
    con.query(query, (err, results, fields) =>
    {
        err ?
        res.send(err) :
        res.send(results);
    });
});

/*
localhost:3001/api/name
// PARÁMETROS COMPULSORIOS
    usuario=aaa
*/
app.get("/api/name", (req, res) =>
{
    if (req.query.usuario)
    {
        con.query(
            `SELECT nombre FROM usuario WHERE usuario.usuario = '${req.query.usuario}';`,
            (err, results, fields) => err ? res.send(err) : res.send(results)
        )
        let query = `SELECT nombre FROM usuario WHERE usuario.usuario = ${req.query.usuario};`
    }
    else
    {
        res.status(400);
        res.send("Error: Solicitud incompleta")
    }
});

/*
localhost:3001/api/exam
// PARÁMETROS COMPULSORIOS
    personal=aaa
    paciente=bbb
    medico=ccc
    tipo=1
    fecha=YYYY-MM-DD
    total=10
// PARÁMETROS OPCIONALES
    c1=2
    c2=0
    ...
    c10=1
*/
app.post("/api/exam", (req, res) =>
{
    if (req.query.personal && req.query.paciente &&
        req.query.medico && req.query.tipo &&
        req.query.fecha && req.query.total)
    {
        let query = "INSERT INTO examen ("
            + "usuario_personal, usuario_paciente,"
            + " usuario_medico, tipo, fecha, total";
        for (let i = 0; i < 10; i++)
        {
            query += req.query[`c${i + 1}`] ? `, cat_${i + 1}` : "";
        }
        query += `) VALUES ('${req.query.personal}', '${req.query.paciente}',`
            + ` '${req.query.medico}', '${req.query.tipo}',`
            + ` '${req.query.fecha}', ${req.query.total}`
        for (let i = 0; i < 10; i++)
        {
            query += req.query[`c${i + 1}`] ? `, ${req.query[`c${i + 1}`]}` : "";
        }
        query += ");"
        console.log(query);
        con.query(query, (err, results, fields) =>
        {
            err ?
            res.send(err) :
            {};
        });
        con.query("SELECT LAST_INSERT_ID();", (err, results, fields) =>
        {
            err ? 
            res.send(err) :
            res.send(results);
        });
    }
    else
    {
        res.status(400);
        res.send("Error: Solicitud incompleta")
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
