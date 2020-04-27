import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class DirectionController {

    /**
     * Get all province.
     * path: /province
     * method: get
    */
    async getProvinces(req: Request, res: Response): Promise<Response> {
        const query = `select getprovinces('provincesCursor'); `;
        const fetch = `FETCH ALL IN "provincesCursor";`;
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
     * Get all cantons by province.
     * path: /province/:id/canton
     * method: get
     */
    async getCantones(req: Request, res: Response): Promise<Response> {
        const query = `select getcantones($1,'cantonesCursor');`;
        const fetch = `FETCH ALL IN "cantonesCursor";`;
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
     * Get all district by canton.
     * path: /canton/:id/district
     * method: get
     */
    async getDistrics(req: Request, res: Response): Promise<Response> {
        const query = `select getdistricts($1,'districtsCursor');`;
        const fetch = `FETCH ALL IN "districtsCursor";`;
        const client = await pool.connect();
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
     * Get province, canton, district by dni - student
     * path: /direction/:dni
     * method: get
     */
    async getDirectionsByDni (req: Request, res: Response): Promise<Response> {
        const query = `select getdirectionbydni($1,'districtsCursor');`;
        const fetch = `FETCH ALL IN "districtsCursor";`;
        const client = await pool.connect();
        try {
            const id = [parseInt(req.params.dni)];
            
            const response = await Queries.simpleSelectWithParameter(query, id, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const directionController = new DirectionController();
export default directionController;