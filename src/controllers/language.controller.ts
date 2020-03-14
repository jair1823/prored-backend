import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getLanguages = async (req: Request, res: Response): Promise<Response> => {
    try {
        const centers: QueryResult = await pool.query('SELECT * FROM public.language;');
        return res.status(200).json(centers.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}