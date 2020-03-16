import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/connection'

export const getAsoCareerFromCenter = async (req: Request, res:Response): Promise<Response> => {
    const query = `select getasocareerfromcenter(1,'cur');`;
    const fetch = `fetch all in "cur"`;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(query);
        const response: QueryResult = await client.query(fetch);
        
        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(response.rows);
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json('Internal Server Error');
    }
}