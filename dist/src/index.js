"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
var body_parser_1 = __importDefault(require("body-parser"));
var jsonParser = body_parser_1.default.json();
var db = __importStar(require("./db-connection"));
app.get('/user/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query_1, db_response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /user');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query_1 = "SELECT * FROM usuarios WHERE id='" + req.params.id + "'";
                return [4 /*yield*/, db.query(query_1)];
            case 2:
                db_response = _a.sent();
                if (db_response.rows.length > 0) {
                    console.log("Usuario encontrado");
                    res.json(db_response.rows[0]);
                }
                else {
                    console.log('Usuario no encontrado');
                    res.json('Usuario no encontrado');
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/log', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query_2, db_response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /log. \n        Body:" + JSON.stringify(req.body));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query_2 = "INSERT INTO usuarios VALUES ('" + req.body.id + "','" + req.body.name + "'," + req.body.puntuacion + ")";
                return [4 /*yield*/, db.query(query_2)];
            case 2:
                db_response = _a.sent();
                console.log(db_response);
                if (db_response.rows.length == 0) {
                    console.log("Usuario creado");
                    res.json("Usuario creado correctamente");
                }
                else {
                    console.log('Usuario no creado');
                    res.json('Usuario no creado');
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/ranking', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db_response, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Petición recibida al endpoint GET /ranking');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.query("SELECT id, name, puntuacion FROM usuarios ORDER BY puntuacion DESC;")];
            case 2:
                db_response = _a.sent();
                if (db_response.puntuacion != '[null]') {
                    console.log(db_response.rows[0]);
                    res.json(db_response.rows[0]);
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/puntuation/:id_usuario', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query_3, db_response, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Petici\u00F3n recibida al endpoint POST /puntuation. \n        Body:" + JSON.stringify(req.body));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                query_3 = "UPDATE INTO usuarios SET puntuacion WHERE id = " + req.params.id_usuario + ")";
                return [4 /*yield*/, db.query(query_3)];
            case 2:
                db_response = _a.sent();
                console.log(db_response);
                if (db_response.rowCount == 1) {
                    console.log("Usuario creado: " + req.body.id);
                    res.json("Usuario creado correctamente");
                }
                else {
                    console.log('Usuario no encontrado');
                    res.json('Usuario no encontrado');
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
var port = process.env.PORT || 3000;
app.listen(port, function () {
    return console.log("App listening on port " + port + "\n        ENDPOINT:\n        GET user/:email\n        ");
});
