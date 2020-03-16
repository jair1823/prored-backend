import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getProvinces = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getprovinces('provincesCursor'); `;
    const fetch = `FETCH ALL IN "provincesCursor";`;
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

export const getCantones = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcantones($1,'cantonesCursor');`;
    const fetch = `FETCH ALL IN "cantonesCursor";`;
    const client = await pool.connect();
    try {
        const id = req.params.id;
        await client.query('BEGIN');

        await client.query(query,[id]);
        const center: QueryResult = await client.query(fetch);
        
        await client.query('ROLLBACK');
        client.release();
        
        return res.status(200).json(center.rows);
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

export const getDistrics = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getdistricts($1,'districtsCursor');`;
    const fetch = `FETCH ALL IN "districtsCursor";`;
    const client = await pool.connect();
    try {
        const id = req.params.id;
        await client.query('BEGIN');

        await client.query(query,[id]);

        const center: QueryResult = await client.query(fetch);
        
        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(center.rows);
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