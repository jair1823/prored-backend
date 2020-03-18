import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

/**
 * Get all networks.
 * path: /network
 * method: get
 */
export const getNetworks = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getnetworks('networksCursor'); `;
    const fetch = `FETCH ALL IN "networksCursor";`;
    const client = await pool.connect();
    try {

        await client.query('BEGIN');

        await client.query(query);
        const response: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.status(500).json('Internal Server Error');
    }
}

/**
 * Get specific network.
 * path: /network/:id
 * method: get
 */
export const getNetworkbyId = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getnetworksbyid($1,'networksCursor');`;
    const fetch = `FETCH ALL IN "networksCursor";`;
    const client = await pool.connect();
    try {
        const id = parseInt(req.params.id);
        await client.query('BEGIN');
        await client.query(query, [id]);
        const response: QueryResult = await client.query(fetch);
        await client.query('ROLLBACK');
        client.release();
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.status(500).json('Internal Server Error');
    }
}

/**
 * Create new network.
 * path: /network
 * method: post
 */
export const createNetwork = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT createnetwork($1,$2)`;
    const client = await pool.connect();
    try {

        const values = [req.body.name, req.body.type];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');

        client.release();
        return res.status(200).json({
            msg: 'Network created'
        });
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Update specific network.
 * path: /network/:id
 * method: put
 */
export const updateNetwork = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT updatenetwork($1,$2,$3)`;
    const client = await pool.connect();
    try {

        const values = [req.body.name, req.body.type, parseInt(req.params.id)];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');

        client.release();
        return res.status(200).json({
            msg: 'Network modified succesfully'
        });

    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Delete specific network.
 * path: /network/:id
 * method: delete
 */
export const deleteNetwork = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT deletenetwork($1)`;
    const client = await pool.connect();
    try {
        const id = parseInt(req.params.id)

        await client.query('BEGIN');
        await client.query(query, [id]);
        await client.query('COMMIT');

        client.release();
        return res.status(200).json({
            msg: 'Network deleted succesfuly'
        });
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();

        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
}