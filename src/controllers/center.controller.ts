import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

/**
 * Get all centers.
 * path: /center/
 * method: get
 */
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

/**
 * Get specific center.
 * path: /center/:id
 * method: get
 */
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
 * Create new center.
 * path: /center/
 * method: post
 */
export const createCenter = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT createcenter($1)`;
    const client = await pool.connect();
    try {

        const name = req.body.name;
        await client.query('BEGIN');
        await client.query(query, [name]);
        await client.query('COMMIT');

        client.release();

        return res.status(200).json({
            msg: 'Career created'
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
 * Update specific center.
 * path: /center/:id
 * method: put
 */
export const updateCenter = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT updatecenter($1,$2)`;
    const client = await pool.connect();
    try {
        const values = [req.body.name, req.params.id];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');

        client.release();

        return res.status(200).json({
            msg: 'Career updated'
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
 * Delete specific center.
 * path: /center/:id
 * method: delete
 */
export const deleteCenter = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT deletecenter($1)`;
    const client = await pool.connect();
    try {
        const id = req.params.id;

        await client.query('BEGIN');
        await client.query(query,[id]);
        await client.query('COMMIT');

        client.release();

        return res.status(200).json({
            msg: 'Career deleted'
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