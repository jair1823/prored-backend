import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

/**
 * Get all associated career.
 * path: /associated_career
 * method: get
 */
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

        return res.status(200).json(
            asocareers.rows
        );
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

/**
 * Get a specific associated career
 * path: /associated_career/:id
 * method: get
 */
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

        return res.status(200).json(
            center.rows
        );
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

/**
 * Create Associated Career
 * path: /associated_career
 * method: post
 */
export const createAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT createassociated_career($1,$2)`;
    const client = await pool.connect();
    try {
        const { name, id_center } = req.body;

        await client.query('BEGIN');
        await client.query(query, [name, id_center]);
        await client.query('COMMIT');
        client.release();

        return res.status(200).json(
            {
                msg: 'Associated Career Created'
            }
        );
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

/**
 * Update Associated career
 * path: /associated_career/:id
 * method: put
 */
export const updateAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT updateassociated_career($1,$2)`;
    const client = await pool.connect();
    try {
        const values = [req.body.name, req.params.id];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');
        client.release();

        return res.status(200).json({
            msg: 'Associated Career Updated'
        });
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

/**
 * Delete Associated career
 * path: /associated_career/:id
 * method: delete
 */
export const deleteAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT deleteassociated_career($1)`;
    const client = await pool.connect();
    try {
        const id = req.params.id;

        await client.query('BEGIN');
        await client.query(query, [id]);
        await client.query('COMMIT');
        client.release();

        return res.status(200).json({
            msg: 'Associated Career deleted'
        });
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

/**
 * Get all associated career with center
 * path: /associated_career_center
 * method: get
 */
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

        return res.status(200).json(
            asocareers.rows
        );
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