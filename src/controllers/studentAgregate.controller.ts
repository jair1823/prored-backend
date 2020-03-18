import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

export const getPersons = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getpersons('personsCursor');`;
    const fetch = `FETCH ALL IN "personsCursor";`;
    const client = await pool.connect();
    try {

        await client.query('BEGIN');

        await client.query(query)
        const students: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.json(students.rows);
    } catch (error) {
        console.log(error);
        return res.send('Internal Server Error');
    }
}

export const getPersonbyId = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getperson($1,'personsCursor');`;
    const fetch = `FETCH ALL IN "personsCursor";`;
    const client = await pool.connect();
    try {
        const dni = req.params.dni;
        await client.query('BEGIN');
        await client.query(query, [dni])
        const students: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.json(students.rows);
    } catch (error) {
        console.log(error);
        return res.send('Internal Server Error');
    }
}

export const getPersonBasic = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getpersonsbasic('personsCursor');`;
    const fetch = `FETCH ALL IN "personsCursor";`;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(query)
        const students: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.json(students.rows);
    } catch (error) {
        console.log(error);
        return res.send('Internal Server Error');
    }
}

export const getPersonInvited = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getpersonsinvited('personsCursor');`;
    const fetch = `FETCH ALL IN "personsCursor";`;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(query)
        const students: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.json(students.rows);
    } catch (error) {
        console.log(error);
        return res.send('Internal Server Error');
    }
}