import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV,
    DATABASE_PORT
} = process.env;

console.log(ENV);

const Client = new Pool({
    host: POSTGRES_HOST,
    database: (ENV == 'dev') ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: Number(DATABASE_PORT) || 5432
});

export default Client;
