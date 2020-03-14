import { pool } from '../database/connection';
import {readFileSync} from 'fs';

const dropAll = readFileSync('src/database/drops.sql').toString();
const tables = readFileSync('src/database/tables.sql').toString();
const spsSQL = readFileSync('src/database/sps.sql').toString();

const drops = async () => {
    try {
        await pool.query(dropAll);
        await pool.query(tables);
        await pool.query(spsSQL);
        return;
    } catch (error) {
        console.log(error);
    }
}


drops();