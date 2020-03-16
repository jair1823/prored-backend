import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

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

export const createNetwork = async (req: Request, res: Response): Promise<Response> => {
    const { name, type } = req.body
    console.log(name, type)
    const response: QueryResult = await pool.query('SELECT createnetwork($1,$2)', [name, type])
    return res.json({
        message: "Network created Succesfully",
        body: {
            name,
            type
        }
    })
}

export const updateNetwork = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { name, type } = req.body;
        const response: QueryResult = await pool.query('SELECT updatenetwork($1,$2,$3)', [name, type, id]);
        return res.json(`Network ${id} modified succesfully`)
    } catch (error) {
        console.log(error); 0
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteNetwork = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT deletenetwork($1)', [id]);
        return res.json(`Network ${id} deleted succesfuly`)
    } catch (error) {
        console.log(error); 0
        return res.status(500).json('Internal Server Error');
    }
}