import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getasocareer('asocareersCursor'); `;
    const fetch = `FETCH ALL IN "asocareersCursor";`;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(query);
        const asocareers: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(asocareers.rows);
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

export const getAssoCareerbyId = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getasocareers($1,'asocareersCursor'); `;
    const fetch = `FETCH ALL IN "asocareersCursor";`;
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

export const createAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, id_center } = req.body;
        const sql = 'SELECT createassociated_career($1,$2)';
        const center: QueryResult = await pool.query(sql, [name, id_center]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const updateAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const sql = 'SELECT updateassociated_career($1,$2)';
        const center: QueryResult = await pool.query(sql, [name, id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const deleteAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT deleteassociated_career($1)';
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

export const getAssoCareerWithCenter = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getasocareercenter('asocareerscenterCursor'); `;
    const fetch = `FETCH ALL IN "asocareerscenterCursor";`;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(query);
        const asocareers: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(asocareers.rows);
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