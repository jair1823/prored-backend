import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

/**
 * Get all careeres.
 * path: /career/
 * method: get
 */
export const getCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcareer('careersCursor'); `;
    const fetch = `FETCH ALL IN "careersCursor";`;
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

/**
 * Get specific career.
 * path: /career/:id
 * method: get
 */
export const getCareerbyId = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getcareers($1,'careersCursor'); `;
    const fetch = `FETCH ALL IN "careersCursor";`;
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
 * Create new career.
 * path: /career/
 * method: post
 */
export const createCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT createcareer($1,$2,$3);`;
    const client = await pool.connect();
    try {

        const values = [req.body.career_code, req.body.name, req.body.degree];

        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');

        client.release();

        return res.status(200).json({
            msg: 'New Career created'
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
 * Update specific career.
 * path: /career/:id
 * method: put
 */
export const updateCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT updatecareer($1,$2,$3);`;
    const client = await pool.connect();
    try {

        const values = [req.body.name, req.body.degree, req.params.id]

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
 * Delete specific career.
 * path: /career/:id
 * method: delete
 */
export const deleteCareer = async (req: Request, res: Response): Promise<Response> => {
    const query = `SELECT deletecareer($1);`;
    const client = await pool.connect();
    try {

        const id = req.params.id;

        await client.query('BEGIN');
        await client.query(query, [id]);
        await client.query('COMMIT');

        client.release();

        return res.status(200).json({
            msg:'Career deleted'
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