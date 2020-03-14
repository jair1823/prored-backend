import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const centers: QueryResult = await pool.query('SELECT * FROM public.associated_career;');
        return res.status(200).json(centers.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const getAssoCareerbyId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM public.associated_career where id_associated_career = $1;';
        const center: QueryResult = await pool.query(sql, [id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const createAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, id_center } = req.body;
        const sql = 'SELECT createassociated_career($1,$2)';
        const center: QueryResult = await pool.query(sql, [name, id_center]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const updateAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const sql = 'SELECT updateassociated_career($1,$2)';
        const center: QueryResult = await pool.query(sql, [name, id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const deleteAssoCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT deleteassociated_career($1)';
        const center: QueryResult = await pool.query(sql, [id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}