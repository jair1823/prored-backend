import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/connection'


/**
 * Get the careers associated to a center
 * path: /associated_career_from_center
 * method: get
 */
export const getAsoCareerFromCenter = async (req: Request, res:Response): Promise<Response> => {
    const query = `select getasocareerfromcenter($1,'cur');`;
    const fetch = `fetch all in "cur"`;
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

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json('Internal Server Error');
    }
}

/**
 * See if a dni already exists in the database
 * path: /person_exists
 * method: post
 */
export const checkPersonExists = async (req: Request, res:Response): Promise<Response> => {
    const query = `select personexists($1);`;
    const client = await pool.connect();
    try {
        const id = req.body.id;
        await client.query('BEGIN');

        const response: QueryResult = await client.query(query, [id]);
        
        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(response.rows[0]);
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json('Internal Server Error');
    }
}

/**
 * See if a career_code already exists in the database
 * path: /career_exists
 * method: post
 */
export const checkCareerExists = async (req: Request, res:Response): Promise<Response> => {
    const query = `select careerexists($1);`;
    const client = await pool.connect();
    try {
        const id = parseInt(req.body.id);
        await client.query('BEGIN');

        const response: QueryResult = await client.query(query, [id]);
        
        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(response.rows[0]);
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json('Internal Server Error');
    }
}

/**
 * See if a campus_code already exists in the database
 * path: /campus_exists
 * method: post
 */
export const checkCampusExists = async (req: Request, res:Response): Promise<Response> => {
    const query = `select campusexists($1);`;
    const client = await pool.connect();
    try {
        const id = req.body.id;
        await client.query('BEGIN');

        const response: QueryResult = await client.query(query, [id]);
        
        await client.query('ROLLBACK');
        client.release();

        return res.status(200).json(response.rows[0]);
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.status(500).json('Internal Server Error');
    }
}