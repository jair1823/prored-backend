import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const DirectionSeeds = readFileSync('src/database/Seeds/SeedsDirections.sql').toString();
const LanguageSeeds = readFileSync('src/database/Seeds/SeedsLanguage.sql').toString();
const CampusSeeds = readFileSync('src/database/Seeds/SeedsCampus.sql').toString();
const Seeds = readFileSync('src/database/Seeds/Seeds.sql').toString();


/**
 * se ejecutan los insert que estan el el archivo src/database/inserts.sql
 */
async function execute() {
    try {
        await pool.query(DirectionSeeds);
        await pool.query(LanguageSeeds);
        await pool.query(CampusSeeds);
        await pool.query(Seeds);
    } catch (error) {
        console.log(error);
    }
}

execute();