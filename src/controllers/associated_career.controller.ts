import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class AssociatedCareerController {

    /**
     * Get all associated career.
     * path: /associated_career
     * method: get
    */
    async getAssoCareer(req: Request, res: Response): Promise<Response> {
        const query = `select getasocareer('asocareersCursor'); `;
        const fetch = `FETCH ALL IN "asocareersCursor";`;
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
     * Get a specific associated career
     * path: /associated_career/:id
     * method: get
    */
    async getAssoCareerbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getasocareers($1,'asocareersCursor'); `;
        const fetch = `FETCH ALL IN "asocareersCursor";`;
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
     * Create Associated Career
     * path: /associated_career
     * method: post
    */
    async createAssoCareer(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createassociated_career($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.body.id_center]

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: "Associated Career created Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update Associated career
     * path: /associated_career/:id
     * method: put
    */
    async updateAssoCareer(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updateassociated_career($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, parseInt(req.params.id)];

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: "Associated Career modified Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Delete Associated career
     * path: /associated_career/:id
     * method: delete
     */
    async deleteAssoCareer(req: Request, res: Response): Promise<Response> {
        const query = `SELECT deleteassociated_career($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];

            await Queries.simpleTransaction(query, id, client);

            return res.status(200).json({
                msg: `Associated Career deleted succesfuly`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get all associated career with center
     * path: /associated_career_center
     * method: get
     */
    async getAssoCareerWithCenter(req: Request, res: Response): Promise<Response> {
        const query = `select getasocareercenter('asocareerscenterCursor'); `;
        const fetch = `FETCH ALL IN "asocareerscenterCursor";`;
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
     * Get the careers associated to a center
     * path: /associated_career_from_center
     * method: get
     */
    async getAsoCareerFromCenter(req: Request, res: Response): Promise<Response> {
        const query = `select getasocareerfromcenter($1,'cur');`;
        const fetch = `fetch all in "cur"`;
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
     * Get the careers associated to a center
     * path: /associated_career_from_center
     * method: get
     */
    async getAsoCareerFromCenterEnable(req: Request, res: Response): Promise<Response> {
        const query = `select getasocareerfromcenterEnable($1,'cur');`;
        const fetch = `fetch all in "cur"`;
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
     * Disable specific associated_career.
     * path: associated_career/career/:pid/disable
     * method: put
    */
    async disableAssociatedCareer(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disableassocareer($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];

            await Queries.simpleTransaction(disable, values, client);

            return res.status(200).json({
                msg: 'Associated Career disabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific associated_career.
     * path: /associated_career/:id/enable
     * method: put
     */
    async enableAssociatedCareer(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enableassocareer($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];
            await Queries.simpleTransaction(enable, values, client);

            return res.status(200).json({
                msg: 'Associated Career enabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const associatedCareerController = new AssociatedCareerController();
export default associatedCareerController;