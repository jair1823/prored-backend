import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

export const pool = new Pool(config);