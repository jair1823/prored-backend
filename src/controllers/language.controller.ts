import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getLanguages = async (req: Request, res: Response): Promise<Response> => {
    
    const query = `select getlanguage('languagesCursor'); `;
    const fetch = `FETCH ALL IN "languagesCursor";`;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(query);
        const centers: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();
        return res.status(200).json(centers.rows);
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);
        
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}