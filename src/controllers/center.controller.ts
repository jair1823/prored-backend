import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getCenter = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcenters('centersCursor'); `;
    const fetch = `FETCH ALL IN "centersCursor";`;
    const client = await pool.connect();
    try {

        await client.query('BEGIN');
        
        await client.query(query);
        const centers: QueryResult = await client.query(fetch);
        
        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(centers.rows);
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const getCenterbyId = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcenterbyid($1, 'centersCursor'); `;
    const fetch = `FETCH ALL IN "centersCursor";`;
    const client = await pool.connect();
    try {
        const id = req.params.id;
        await client.query('BEGIN');

        await client.query(query, [id]);
        const center: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();
        return res.status(200).json(center.rows);
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const createCenter = async (req: Request, res: Response): Promise<Response> => {
    try {
        const name = req.body.name;
        const sql = 'SELECT createcenter($1)';
        const center: QueryResult = await pool.query(sql, [name]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const updateCenter = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const sql = 'SELECT updatecenter($1,$2)';
        const center: QueryResult = await pool.query(sql, [name,id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const deleteCenter = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT deletecenter($1)';
        const center: QueryResult = await pool.query(sql, [id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}