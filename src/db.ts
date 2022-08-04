import { Pool } from 'pg';

const connectionString = '';

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodeRest',
    password: 'Ana926',
    port: 5432 ,
     });

export default db;