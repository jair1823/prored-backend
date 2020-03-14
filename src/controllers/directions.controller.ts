import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database/connection'

export const getProvinces = async (req: Request, res: Response): Promise<Response> => {
    try {
        const centers: QueryResult = await pool.query('SELECT * FROM public.province;');
        return res.status(200).json(centers.rows);
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Internal server error'
            }
        );
    }
}

export const getCantones = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM public.canton where id_province = $1;';
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

export const getDistrics = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM public.district where id_canton = $1;';
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