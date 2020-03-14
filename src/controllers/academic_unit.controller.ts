import {Request,Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/connection'

export const getAcademic_Units = async (req: Request, res:Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM academic_unit');
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const getAcademic_UnitbyId = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT * FROM academic_unit WHERE id_academic_unit = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const createAcademic_Unit = async (req: Request, res:Response): Promise<Response> => {
    const { name} = req.body
    console.log(name)
    const response: QueryResult = await pool.query('SELECT createacademic_unit($1)', [name])
    return res.json({
        message: "Academic Unit created Succesfully",
        body: {
            name
        }
    })
}

export const updateAcademic_Unit = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const response: QueryResult = await pool.query('SELECT updateacademic_unit($1,$2)', [name, id]);
        return res.json(`Academic Unit ${id} modified succesfully`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteAcademic_Unit = async (req: Request, res:Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response: QueryResult = await pool.query('SELECT deleteacademic_unit($1)', [id]);
        return res.json(`Academic Unit ${id} deleted succesfuly`)
    } catch (error) {
        console.log(error);0
        return res.status(500).json('Internal Server Error');
    }
}