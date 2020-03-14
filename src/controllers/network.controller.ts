import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/connection'

export const getNetworks = async (req: Request, res:Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM network');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const getNetworkbyId = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT * FROM network WHERE id_network = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const createNetwork = async (req: Request, res:Response): Promise<Response> => {
    const { name, type} = req.body
    console.log(name,type)
    const response: QueryResult = await pool.query('INSERT INTO public.network (name, network_type) VALUES ($1,$2)', [name,type])
    return res.json({
        message: "Network created Succesfully",
        body: {
            name,
            type
        }
    })
}

export const updateNetwork = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { name, type } = req.body;
        const response: QueryResult = await pool.query('UPDATE network SET name = $1, network_type = $2 WHERE id_network = $3', [name, type, id]);
        return res.json(`Network ${id} modified succesfully`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteNetwork = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('DELETE FROM network WHERE id_network = $1', [id]);
        return res.json(`Network ${id} deleted succesfuly`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}