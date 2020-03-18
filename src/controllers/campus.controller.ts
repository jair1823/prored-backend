import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

/**
 * Get all campus.
 * path: /campus/
 * method: get
 */
export const getCampuses = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcampuses('campusesCursor'); `;
    const fetch = `FETCH ALL IN "campusesCursor";`;
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

        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Get specific campus.
 * path: /campus/:id
 * method: get
 */
export const getCampusbyId = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcampusesbyid($1,'campusesCursor'); `;
    const fetch = `FETCH ALL IN "campusesCursor";`;
    const client = await pool.connect();
    try {
        const id = req.params.id;
        await client.query('BEGIN');

        await client.query(query, [id]);
        const response: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(response.rows);
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
 * Create campus.
 * path: /campus/
 * method: post
 */
export const createCampus = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT createcampus($1,$2)`;
    const client = await pool.connect();
    try {
        const values = [req.body.code, req.body.name];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');

        client.release();

        return res.json({
            msg: "Campus created Succesfully"
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
 * Update specific campus.
 * path: /campus/:id
 * method: put
 */
export const updateCampus = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT updatecampus($1,$2,$3)`;
    const client = await pool.connect();
    try {
        const values = [req.body.code, req.body.name, parseInt(req.params.id)];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');

        client.release();
        return res.json({
            msg: `Campus modified succesfully`
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
 * Delete specific campus.
 * path: /campus/:id
 * method: delete
 */
export const deleteCampus = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT deletecampus($1)`;
    const client = await pool.connect();
    try {
        const id = parseInt(req.params.id)
        await client.query('BEGIN');
        await client.query(query, [id]);
        await client.query('COMMIT');

        client.release();

        return res.json({
            msg: `Campus deleted succesfuly`
        })
    } catch (error) {
        await client.query('ROLLBACK');
        client.release();
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
}