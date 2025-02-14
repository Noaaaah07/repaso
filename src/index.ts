import express, { query, response } from "express";
import cors from 'cors';
const app = express();
app.use(cors());
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import * as db from './db-connection';

app.get('/user/:id', async (req, res) => {
    console.log('Petición recibida al endpoint GET /user');
    try {
        let query = `SELECT * FROM usuarios WHERE id='${req.params.id}'`;
        let db_response = await db.query(query);
        if(db_response.rows.length > 0){
            console.log(`Usuario encontrado`)
            res.json(db_response.rows[0])
        }else{
            console.log('Usuario no encontrado')
            res.json('Usuario no encontrado')
        }
        

    } 
    catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error'); 
    }
    
});

app.post('/log', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /log. 
        Body:${JSON.stringify(req.body)}`);

    try {
        let query = `INSERT INTO usuarios VALUES ('${req.body.id}','${req.body.name}',${req.body.puntuacion})`;
        let db_response = await db.query(query);
        console.log(db_response);
        if(db_response.rows.length == 0){
            console.log(`Usuario creado`)
            res.json(`Usuario creado correctamente`)
        }else{
            console.log('Usuario no creado')
            res.json('Usuario no creado')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/ranking', async (req, res) => {
    console.log('Petición recibida al endpoint GET /ranking');
    try {
        let db_response = await db.query("SELECT id, name, puntuacion FROM usuarios ORDER BY puntuacion DESC;");
        if(db_response.puntuacion != '[null]'){
            console.log(db_response.rows[0]);
            res.json(db_response.rows[0]);
        }
        
    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error'); 
    }
});

app.post('/puntuation/:id_usuario', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /puntuation. 
        Body:${JSON.stringify(req.body)}`);

    try {
        let query = `UPDATE INTO usuarios SET puntuacion WHERE id = ${req.params.id_usuario})`;
        let db_response = await db.query(query);
        console.log(db_response);
        if(db_response.rowCount == 1){
            console.log(`Usuario creado: ${req.body.id}`)
            res.json(`Usuario creado correctamente`)
        }else{
            console.log('Usuario no encontrado')
            res.json('Usuario no encontrado')
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/*app.get('/alumnos', async (req, res) => {
    console.log('Petición recibida al endpoint GET /alumnos');
    try {
        let db_response = await db.query("SELECT * FROM alumnos;");
        console.log(db_response.rows);
        res.json(db_response);
    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error'); 
    }
});*/

/*app.post('/alumnos', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /alumnos. 
        Body:${JSON.stringify(req.body)}`);

    try {
        let query = `INSERT INTO alumnos (name, email, img) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.img}');`;
        console.log(query);
        let db_response = await db.query(query);
        console.log(db_response);
        res.json(query);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');

    }
});*/

const port = process.env.PORT || 3000;

app.listen(port, () => 
    console.log(`App listening on port ${port}
        ENDPOINT:
        GET user/:email
        `))