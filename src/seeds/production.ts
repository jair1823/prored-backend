import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const DirectionSeeds = readFileSync('src/database/Seeds/SeedsDirections.sql').toString();
const LanguageSeeds = readFileSync('src/database/Seeds/SeedsLanguage.sql').toString();
const CampusSeeds = readFileSync('src/database/Seeds/SeedsCampus.sql').toString();
const FinancialSeeds = readFileSync('src/database/Seeds/SeedsFinancial.sql').toString();
const SeedsProd = readFileSync('src/database/Seeds/SeedsProd.sql').toString();


/**
 * se ejecutan los insert que estan el el archivo src/database/inserts.sql
 */
async function execute() {
    try {
        await pool.query(DirectionSeeds);
        await pool.query(LanguageSeeds);
        await pool.query(CampusSeeds);
        await pool.query(FinancialSeeds);
        await pool.query(SeedsProd);
    } catch (error) {
        console.log(error);
    }
}

execute();