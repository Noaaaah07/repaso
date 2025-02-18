import{ Pool } from 'pg';

/*const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'BD_proyecto_final'
});*/



const connectionString = 'postgresql://proyecto_final_24_25_k8bw_user:5SGIr48pH0sMGqASTsOLVNoCQZFYmXX9@dpg-cum73p52ng1s73fqab3g-a/proyecto_final_24_25_k8bw'

const pool = new Pool ({
    connectionString
})

export function query (text: any): any {
    return pool.query(text);
};