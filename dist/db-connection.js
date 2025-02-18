"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
/*const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'BD_proyecto_final'
});*/
const connectionString = 'postgresql://proyecto_final_24_25_k8bw_user:5SGIr48pH0sMGqASTsOLVNoCQZFYmXX9@dpg-cum73p52ng1s73fqab3g-a/proyecto_final_24_25_k8bw';
const pool = new pg_1.Pool({
    connectionString
});
function query(text) {
    return pool.query(text);
}
exports.query = query;
;
