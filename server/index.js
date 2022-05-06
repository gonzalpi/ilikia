// server/index.js

const express = require("express");
const mysql = require("mysql2");
// const path = require("path");

const PORT = process.env.PORT || 3001;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
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
    let query_paciente = "SELECT examen.*, usuario.nombre AS nombre_paciente FROM examen"
        + " JOIN usuario ON examen.usuario_paciente = usuario.usuario"
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
        // + ";";
    let query_personal = "SELECT paciente.*, usuario.nombre AS nombre_personal FROM ("
        + query_paciente + ") paciente"
        + " JOIN usuario ON paciente.usuario_personal = usuario.usuario"
    let query_medico = "SELECT personal.*, usuario.nombre AS nombre_medico FROM ("
    + query_personal + ") personal"
    + " JOIN usuario ON personal.usuario_medico = usuario.usuario"
    query = query_medico + ";";
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
        console.log(`SELECT nombre FROM usuario WHERE usuario.usuario = ${req.query.usuario};`);
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
        req.query.total)
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
            + ` CURDATE(), ${req.query.total}`
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

/*
localhost:3001/api/exam
// PARÁMETROS COMPULSORIOS
    usuario=aaa
// NOTA: usuario debe existir, si no, no retorna nada aún
*/
app.get("/api/usertype", (req, res) =>
{
    if (req.query.usuario)
    {
        // setTimeout(() => {return res.send({"tipo": -1});}, 2000)
        con.query(
            `SELECT usuario FROM paciente WHERE paciente.usuario='${req.query.usuario}';`,
            (err, results, fields) =>
            {
                if (err) {res.send(err);}
                else if (results.length > 0) {res.send({"tipo": 0});}
            }
        );
        con.query(
            `SELECT rol FROM personal_salud WHERE personal_salud.usuario='${req.query.usuario}';`,
            (err, results, fields) =>
            {
                if (err) {res.send(err);}
                else if (results.length > 0) {console.log(res); res.send({"tipo": results[0].rol});}
            }
        );
    }
    else
    {
        res.status(400);
        res.send("Error: Solicitud incompleta");
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
