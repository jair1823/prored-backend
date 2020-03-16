import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/connection'

export const getCampuses = async (req: Request, res:Response): Promise<Response> => {
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

        return res.status(500).json('Internal Server Error');
    }
}

export const getCampusbyId = async (req: Request, res:Response): Promise<Response> => {
    const query = `select getcampusesbyid($1,'campusesCursor'); `;
    const fetch = `FETCH ALL IN "campusesCursor";`;
    const client = await pool.connect();
    try {
        const id = req.params.id;
        await client.query('BEGIN');

        await client.query(query,[id]);
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

export const createCampus = async (req: Request, res:Response): Promise<Response> => {
    const { code, name } = req.body
    console.log(code, name)
    const response: QueryResult = await pool.query('SELECT createcampus($1,$2)', [code, name])
    return res.json({
        message: "Campus created Succesfully",
        body: {
            code,
            name
        }
    })
}

export const updateCampus = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { code, name } = req.body;
        const response: QueryResult = await pool.query('SELECT updatecampus($1,$2,$3)', [code,name, id]);
        return res.json(`Campus ${id} modified succesfully`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteCampus = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT deletecampus($1)', [id]);
        return res.json(`Campus ${id} deleted succesfuly`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}