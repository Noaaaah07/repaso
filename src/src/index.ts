import express from "express";
import cors from 'cors';
const app = express();
app.use(cors());

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

import * as db from './db-connection';

app.get('/user/:email', async (req, res) => {
    console.log(`Petición recibida al endpoint GET /user/:email.`);
    console.log(`Parámetro recibido por URL: ${req.params.email}`);

    try{
        let query = `SELECT * FROM usuarios WHERE id='${req.params.email}'`;
        let db_response = await db.query(query);

        if(db_response.rows.length > 0){
            console.log(`Usuario encontrado: ${db_response.rows[0].id}`);
            res.json(db_response.rows[0]);   
        } else{
            console.log(`Usuario no encontrado.`)
            res.json(`User not found`);
        }

    } catch (err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

app.post('/user', jsonParser, async (req, res) => {

    console.log(`Petición recibida al endpoint POST /user. 
        Body: ${JSON.stringify(req.body)}`);

    try {
        
        let query = `INSERT INTO usuarios 
        VALUES ('${req.body.id}', '${req.body.nombre}');`; 
        let db_response = await db.query(query);

        console.log(db_response);

        if(db_response.rowCount == 1){
            res.json(`El registro ha sido creado correctamente.`);
        } else{
            res.json(`El registro NO ha sido creado.`);
        }
    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/*app.post('/perfil', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /perfil. 
        Body:${JSON.stringify(req.body)}`);
    try {
        
        let query = `INSERT INTO alumnos (name, email, img) 
        VALUES ('${req.body.name}', '${req.body.email}', '${req.body.img}');`;
        console.log(query);
        let db_response = await db.query(query);
        console.log(db_response);
        
        res.json(`El registro del señor/a ${req.body.nombre} ${req.body.apellidos}, con domicilio ${req.body.direccion},
             y color de pelo ${req.body.color_pelo} ha sido creado.`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/suma/:valor1/:valor2', (req, res) => {
    let resultado: number = 0;
    resultado = Number(req.params.valor1) + Number(req.params.valor2);
    console.log("resultado: " + resultado);
    res.send(String(resultado));
});*/

/*app.post('/futbolistas', jsonParser, async (req, res) => {
    console.log(`Petición recibida al endpoint POST /futbolistas. 
        Body:${JSON.stringify(req.body)}`);
    try {
        let query = `INSERT INTO alumnos (name, email, img) 
        VALUES ('${req.body.name}', '${req.body.email}', '${req.body.img}');`;
        console.log(query);
        let db_response = await db.query(query);
        console.log(db_response);
        res.json("Registro guardado correctamente.");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});*/

const port = process.env.PORT || 3000;

app.listen(port, () => 
    console.log(`App listening on PORT ${port}.

    ENDPOINTS:
    
     - GET /user/:email
     - POST /user
     `));