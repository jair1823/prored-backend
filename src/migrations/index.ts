import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const dropAll = readFileSync('src/database/drops.sql').toString();
const dropSpsStudent = readFileSync('src/database/spsStudentDrops.sql').toString();
const enumNati = readFileSync('src/database/enum_nationality.sql').toString();
const tables = readFileSync('src/database/tables.sql').toString();
const spsSQL = readFileSync('src/database/sps.sql').toString();
const spsStuden = readFileSync('src/database/spsStudent.sql').toString();

/**
 * Secuencia en la que se ejecutan los drops de toda la base 
 *  y luego la creacion de cada tabla enum y sp
 */
async function drops() {
    try {
        await pool.query(dropSpsStudent);
        await pool.query(dropAll);
        await pool.query(enumNati);
        await pool.query(tables);
        await pool.query(spsSQL);
        await pool.query(spsStuden);
        return;
    } catch (error) {
        console.log(error);
    }
}


drops();