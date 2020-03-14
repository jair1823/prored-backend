import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const insert = readFileSync('src/database/inserts.sql').toString();


const execute = async () => {
    try {
        await pool.query(insert);
    } catch (error) {
        console.log(error);
    }
};


execute();