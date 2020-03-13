import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/connection'

export const getInvestigation_Units = async (req: Request, res:Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM investigation_unit');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const getInvestigation_UnitbyId = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT * FROM investigation_unit WHERE id_inv_unit = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const createInvestigation_Unit = async (req: Request, res:Response): Promise<Response> => {
    const { name} = req.body
    console.log(name)
    const response: QueryResult = await pool.query('SELECT createinvestigation_unit($1)', [name])
    return res.json({
        message: "Investigation Unit created Succesfully",
        body: {
            name
        }
    })
}

export const updateInvestigation_Unit = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const response: QueryResult = await pool.query('SELECT updateinvestigation_unit($1,$2)', [name, id]);
        return res.json(`Investigation Unit ${id} modified succesfully`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteInvestigation_Unit = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT deleteinvestigation_unit($1)', [id]);
        return res.json(`Investigation Unit ${id} deleted succesfuly`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}