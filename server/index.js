// server/index.js

const express = require("express");
const mysql = require("mysql2");
const path = require("path");

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
app.use(express.static(path.resolve(__dirname, '../client/build')));

/*
localhost:3001/api/exam
Returns exam data
// OPTIONAL PARAMETERS
    id=1
    personal=aaa
    paciente=bbb
    medico=ccc
// RETURN VALUES
    [
        {id_examen, usuario_personal, usuario_paciente, usuario_medico, tipo, fecha,
        total, cat_1, ..., cat_10, nombre_paciente, nombre_personal, nombre_medico},
        ...
    ]
*/
app.get("/api/exam", (req, res) =>
{
    // Log call
    console.log("Get: exam" +
    (req.query.id ? ` id=${req.query.id}` : "") +
    (req.query.personal ? ` personal=${req.query.personal}` : "") +
    (req.query.paciente ? ` paciente=${req.query.paciente}` : "") +
    (req.query.medico ? ` medico=${req.query.medico}` : "")
    );
    // Build query
    // Part 1: add nombre_paciente to result
    let query_paciente = "SELECT examen.*, usuario.nombre AS nombre_paciente FROM examen"
        + " JOIN usuario ON examen.usuario_paciente = usuario.usuario"
        // 
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
            ` AND usuario_medico='${req.query.medico}'` : "");
    // Part 2: add nombre_personal to result
    let query_personal = "SELECT paciente.*, usuario.nombre AS nombre_personal FROM ("
        + query_paciente + ") paciente"
        + " JOIN usuario ON paciente.usuario_personal = usuario.usuario"
    // Part 3: add nombre_medico to result
    let query_medico = "SELECT personal.*, usuario.nombre AS nombre_medico FROM ("
    + query_personal + ") personal"
    + " JOIN usuario ON personal.usuario_medico = usuario.usuario"
    // Part 4: close query
    query = query_medico + ";";
    // Query database
    con.query(query, (err, results, fields) =>
    {
        err ?
        res.send(err) :
        res.send(results);
    });
});

/*
localhost:3001/api/name
// Returns nombre (name) of usuario (user)
// COMPULSORY PARAMETERS
    usuario=aaa
// RETURN VALUES
    [{nombre}]
*/
app.get("/api/name", (req, res) =>
{
    // Log call
    console.log("Get: name" +
        (req.query.usuario ? ` usuario=${req.query.usuario}`: "")
    );
    if (req.query.usuario)
    {
        // Query database
        con.query(
            `SELECT nombre FROM usuario WHERE usuario.usuario = '${req.query.usuario}';`,
            (err, results, fields) => err ? res.send(err) : res.send(results)
        )
    }
    else
    {
        // Return error if incomplete
        res.status(400);
        res.send("Error: Solicitud incompleta")
    }
});

/*
localhost:3001/api/exam
// Posts exam results and returns exam id
// COMPULSORY PARAMETERS
    personal=aaa
    paciente=bbb
    medico=ccc
    tipo=1
    total=10
// OPTIONAL PARAMETERS
    c1=2
    c2=0
    ...
    c10=1
*/
app.post("/api/exam", (req, res) =>
{
    // Log call
    console.log("Post: exam")
    if (req.query.personal && req.query.paciente &&
        req.query.medico && req.query.tipo &&
        req.query.total)
    {
        // Build query
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
        // Query database: insert data
        con.query(query, (err, results, fields) =>
        {
            err ?
            res.send(err) :
            {};
        });
        // Query database: return id
        con.query("SELECT LAST_INSERT_ID();", (err, results, fields) =>
        {
            err ? 
            res.send(err) :
            res.send(results);
        });
    }
    else
    {
        // Return error if incomplete
        res.status(400);
        res.send("Error: Solicitud incompleta")
    }
});

/*
localhost:3001/api/usertype
// Returns type of user
// COMPULSORY PARAMETERS
    usuario=aaa
// RETURN VALUE
    {tipo}
    -1 : non-existent
     0 : patient
     1 : doctor
     2 : other medical staff
*/
app.get("/api/usertype", (req, res) =>
{
    // Log call
    console.log("Get: usertype" +
        (req.query.usuario ? ` usuario=${req.query.usuario}` : "")
    );
    if (req.query.usuario)
    {
        // Query database
        con.query(
            `SELECT usuario FROM usuario WHERE usuario.usuario='${req.query.usuario}';`,
            (err, results, fields) =>
            {
                if (results.length > 0)
                {
                    // Check if usuario exists in paciente and returned tipo 0
                    con.query(
                        `SELECT usuario FROM paciente WHERE paciente.usuario='${req.query.usuario}';`,
                        (err, results, fields) =>
                        {
                            if (err) {res.send(err);}
                            else if (results.length > 0) {res.send({"tipo": 0});}
                        }
                    );
                    // Check if usuario exists in personal_salud and return assigned tipo
                    con.query(
                        `SELECT rol FROM personal_salud WHERE personal_salud.usuario='${req.query.usuario}';`,
                        (err, results, fields) =>
                        {
                            if (err) {res.send(err);}
                            else if (results.length > 0) {res.send({"tipo": results[0].rol});}
                        }
                    );
                }
                else
                {
                    // Return -1 since usuario does not exist
                    res.send({"tipo": -1});
                }
            }
        )
    }
    else
    {
        // Return error if incomplete
        res.status(400);
        res.send("Error: Solicitud incompleta");
    }
});

/*
localhost:3001/api/staff
// Returns usuario_personal (medical staff user) in charge of usuario_paciente (patient)
// COMPULSORY PARAMETERS
    usuario=aaa
// RETURN VALUES
    [
        {usuario_paciente},
        ...
    ]
*/
app.get("/api/staff", (req, res) =>
{
    // Log call
    console.log("Get: staff" +
        (req.query.usuario ? ` usuario=${req.query.usuario}` : "")
    );
    if (req.query.usuario)
    {
        // Query database
        con.query(
            `SELECT usuario_personal FROM atiende WHERE atiende.usuario_paciente='${req.query.usuario}';`,
            (err, results, fields) =>
            {
                err ?
                res.send(err) :
                res.send(results)
            }
        );
    }
    else
    {
        // Return error if incomplete
        res.status(400);
        res.send("Error: Solicitud incompleta");
    }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
