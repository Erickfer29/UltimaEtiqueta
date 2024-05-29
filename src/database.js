import { createPool } from "mysql2/promise"

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'UltimaEtiqueta',
    password: 'ultimaetiqueta',
    database: 'ultimaetiqueta'   
});

export default pool;