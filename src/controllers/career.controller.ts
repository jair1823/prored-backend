import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries'

export class CareerController {

    /**
     * Get all careeres.
     * path: /career/
     * method: get
     */
    async getCareer(req: Request, res: Response): Promise<Response> {
        const query = `select getcareer('careersCursor'); `;
        const fetch = `FETCH ALL IN "careersCursor";`;
        const client: PoolClient = await pool.connect();
        try {

            const response = await Queries.simpleSelect(query, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get careeres enabled.
     * path: /career/
     * method: get
     */
    async getCareerEnable(req: Request, res: Response): Promise<Response> {
        const query = `select getcareerEnable('careersCursorEnable'); `;
        const fetch = `FETCH ALL IN "careersCursorEnable";`;
        const client: PoolClient = await pool.connect();
        try {

            const response = await Queries.simpleSelect(query, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get specific career.
     * path: /career/:id
     * method: get
     */
    async getCareerbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getcareers($1,'careersCursor'); `;
        const fetch = `FETCH ALL IN "careersCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];

            const response = await Queries.simpleSelectWithParameter(query, id, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Create new career.
     * path: /career/
     * method: post
     */
    async createCareer(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createcareer($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.body.degree];

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: "Career created Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific career.
     * path: /career/:id
     * method: put
     */
    async updateCareer(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatecareer($1,$2,$3);`;
        const client: PoolClient = await pool.connect();
        try {

            const values = [req.body.name, req.body.degree, req.params.id]

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: `Career modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Delete specific career.
     * path: /career/:id
     * method: delete
     */
    async deleteCareer(req: Request, res: Response): Promise<Response> {
        const query = `SELECT deletecareer($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];

            await Queries.simpleTransaction(query, id, client);

            return res.status(200).json({
                msg: `Career deleted succesfuly`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * Disable specific career.
     * path: /career/:pid/disable
     * method: put
    */
    async disableCareer(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disablecareer($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];

            await Queries.simpleTransaction(disable, values, client);

            return res.status(200).json({
                msg: 'Career disabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific career.
     * path: /career/:id/enable
     * method: put
     */
    async enableCareer(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enablecareer($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];
            await Queries.simpleTransaction(enable, values, client);

            return res.status(200).json({
                msg: 'Career enabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * See if a career_code already exists in the database
     * path: /career/exists/:id
     * method: get
     */
    async checkCareerExists(req: Request, res: Response): Promise<Response> {
        const query = `select careerexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];
            const response = await Queries.simpleSelectNoCursor(query, id, client);


            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const careerController = new CareerController();
export default careerController;