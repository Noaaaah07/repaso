import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'BD_proyecto_final'
});

export function query(text: any): any {
    return pool.query(text);
};