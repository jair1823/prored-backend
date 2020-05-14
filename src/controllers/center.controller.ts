import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class CenterController {

    /**
     * Get all centers.
     * path: /center/
     * method: get
    */
    async getCenter(req: Request, res: Response): Promise<Response> {
        const query = `select getcenters('centersCursor'); `;
        const fetch = `FETCH ALL IN "centersCursor";`;
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
     * Get all centers.
     * path: /center/
     * method: get
    */
    async getCenterEnable(req: Request, res: Response): Promise<Response> {
        const query = `select getcentersEnable('centersCursor'); `;
        const fetch = `FETCH ALL IN "centersCursor";`;
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
     * Get specific center.
     * path: /center/:id
     * method: get
    */
    async getCenterbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getcenterbyid($1, 'centersCursor'); `;
        const fetch = `FETCH ALL IN "centersCursor";`;
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
     * Create new center.
     * path: /center/
     * method: post
    */
    async createCenter(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createcenter($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name];
            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: "Center created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific center.
     * path: /center/:id
     * method: put
    */
    async updateCenter(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatecenter($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.params.id];

            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: `Center modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Delete specific center.
     * path: /center/:id
     * method: delete
    */
    async deleteCenter(req: Request, res: Response): Promise<Response> {
        const query = `SELECT deletecenter($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];

            await Queries.simpleTransaction(query, id, client);

            return res.json({
                msg: `Campus deleted succesfuly`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const centerController = new CenterController();
export default centerController;