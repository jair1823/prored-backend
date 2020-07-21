import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class CampusController {

    /** 
     * Get all campus.
     * path: /campus/
     * method: get
    */
    async getCampuses(req: Request, res: Response): Promise<Response> {
        const query = `select getcampuses('campusesCursor'); `;
        const fetch = `FETCH ALL IN "campusesCursor";`;
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
     * Get all campus.
     * path: /campus/
     * method: get
    */
   async getCampusesEnable(req: Request, res: Response): Promise<Response> {
    const query = `select getcampusesEnable('campusesCursor'); `;
    const fetch = `FETCH ALL IN "campusesCursor";`;
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
     * Get specific campus.
     * path: /campus/:id
     * method: get
    */
    async getCampusbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getcampusesbyid($1,'campusesCursor'); `;
        const fetch = `FETCH ALL IN "campusesCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [req.params.id];

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
     * Create campus.
     * path: /campus/
     * method: post
    */
    async createCampus(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createcampus($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.code, req.body.name];

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: "Campus created Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }

    }

    /**
     * Update specific campus.
     * path: /campus/:id
     * method: put
    */
    async updateCampus(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatecampus($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.params.id];

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: `Campus modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Delete specific campus.
     * path: /campus/:id
     * method: delete
     */
    async deleteCampus(req: Request, res: Response): Promise<Response> {
        const query = `SELECT deletecampus($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [req.params.id]

            await Queries.simpleTransaction(query, id, client);

            return res.status(200).json({
                msg: `Campus deleted succesfuly`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Disable specific campus.
     * path: /campus/:id/disable
     * method: put
     */
    async disableCampus(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disablecampus($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];

            await Queries.simpleTransaction(disable, values, client);

            return res.status(200).json({
                msg: 'Campus disable'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific campus.
     * path: /campus/:id/enable
     * method: put
     */
    async enableCampus(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enablecampus($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];
            await Queries.simpleTransaction(enable, values, client);

            return res.status(200).json({
                msg: 'Campus enable'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * See if a campus_code already exists in the database
     * path: /campus/exists/:id
     * method: get
     */
    async checkCampusExists (req: Request, res: Response): Promise<Response> {
        const query = `select campusexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [req.params.id];
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

const campusController = new CampusController();
export default campusController;