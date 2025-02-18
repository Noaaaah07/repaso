"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
const db = __importStar(require("./db-connection"));
app.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Petición recibida al endpoint GET /user');
    try {
        let query = `SELECT * FROM usuarios WHERE id='${req.params.id}'`;
        let db_response = yield db.query(query);
        if (db_response.rows.length > 0) {
            console.log(`Usuario encontrado`);
            res.json(db_response.rows[0]);
        }
        else {
            console.log('Usuario no encontrado');
            res.json('Usuario no encontrado');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/log', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Petición recibida al endpoint POST /log. 
        Body:${JSON.stringify(req.body)}`);
    try {
        let query = `INSERT INTO usuarios VALUES ('${req.body.id}','${req.body.name}',${req.body.puntuacion})`;
        let db_response = yield db.query(query);
        console.log(db_response);
        if (db_response.rows.length == 0) {
            console.log(`Usuario creado`);
            res.json(`Usuario creado correctamente`);
        }
        else {
            console.log('Usuario no creado');
            res.json('Usuario no creado');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
app.get('/ranking', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Petición recibida al endpoint GET /ranking');
    try {
        let db_response = yield db.query("SELECT FROM usuarios;");
        if (db_response.puntuacion != '[null]') {
            console.log(db_response.rows[0]);
            res.json(db_response.rows[0]);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/puntuation/:id_usuario', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Petición recibida al endpoint POST /puntuation. 
        Body:${JSON.stringify(req.body)}`);
    try {
        let query = `UPDATE INTO usuarios SET puntuacion WHERE id = ${req.params.id_usuario})`;
        let db_response = yield db.query(query);
        console.log(db_response);
        if (db_response.rowCount == 1) {
            console.log(`Usuario creado: ${req.body.id}`);
            res.json(`Usuario creado correctamente`);
        }
        else {
            console.log('Usuario no encontrado');
            res.json('Usuario no encontrado');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
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
app.listen(port, () => console.log(`App listening on port ${port}
        ENDPOINT:
        GET user/:email
        `));
