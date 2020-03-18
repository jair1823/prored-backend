import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const insert = readFileSync('src/database/inserts.sql').toString();


/**
 * se ejecutan los insert que estan el el archivo src/database/inserts.sql
 */
async function execute() {
    try {
        await pool.query(insert);
    } catch (error) {
        console.log(error);
    }
}

execute();