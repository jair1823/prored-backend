import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const centers: QueryResult = await pool.query('SELECT * FROM public.career;');
        return res.status(200).json(centers.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const getCareerbyId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM public.career where career_code = $1;';
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

export const createCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { career_code, name, degree } = req.body;
        const sql = 'SELECT createcareer($1,$2,$3);';
        const center: QueryResult = await pool.query(sql, [career_code, name, degree]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const updateCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const { name, degree } = req.body;
        const sql = 'SELECT updatecareer($1,$2,$3);';
        const center: QueryResult = await pool.query(sql, [name, degree, id]);
        return res.status(200).json(center.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const deleteCareer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT deletecareer($1);';
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