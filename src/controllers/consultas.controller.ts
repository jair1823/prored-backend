import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class ConsultasController {

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
     * See if a dni already exists in the database
     * path: /person_exists
     * method: post
     */
    async checkPersonExists(req: Request, res: Response): Promise<Response> {
        const query = `select personexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [req.body.id];
            const response = await Queries.simpleSelectNoCursor(query, id, client);

            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * See if a career_code already exists in the database
     * path: /career_exists
     * method: post
     */
    async checkCareerExists(req: Request, res: Response): Promise<Response> {
        const query = `select careerexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.body.id)];
            const response = await Queries.simpleSelectNoCursor(query, id, client);


            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * See if a campus_code already exists in the database
     * path: /campus_exists
     * method: post
     */
    async checkCampusExists (req: Request, res: Response): Promise<Response> {
        const query = `select campusexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.body.id)];
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

const consultaController = new ConsultasController();
export default consultaController;