import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';


export class ResearcherController {

    /**
     * Get all enable researchers.
     * path: /researcher/
     * method: get
    */
    async getResearchers(req: Request, res: Response): Promise<Response> {
        const query = `select getresearchers('researchersCursor');`;
        const fetch = `FETCH ALL IN "researchersCursor";`;
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
     * Get all researcher no matter status.
     * path: /researcher_all/
     * method: get
     */

    async getResearchersAll(req: Request, res: Response): Promise<Response> {
        const query = `select getresearchersall('researchersCursor');`;
        const fetch = `FETCH ALL IN "researchersCursor";`;
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
     * Get all researcher no matter status by dni.
     * path: /researcher_all/:dni
     * method: get
     */

    async getResearchersByIdAll(req: Request, res: Response): Promise<Response> {
        const query = `select getresearcherbydniall($1,'researchersCursor');`;
        const fetch = `FETCH ALL IN "researchersCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const response = await Queries.simpleSelectWithParameter(query, [req.params.dni],fetch, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get specific researcher no matter status.
     * path: /researcher/:dni
     * method: get
     */
    async getResearcherByDni(req: Request, res: Response): Promise<Response> {
        const getResearcher = `select getresearcherbydni($1,'researcherCursor');`;
        const fetchResearcher = `FETCH ALL IN "researcherCursor";`;


        const client: PoolClient = await pool.connect();
        try {
            const dni = [req.params.dni];
            const student = await Queries.simpleSelectWithParameter(getResearcher, dni, fetchResearcher, client);
            return res.status(200).json(student.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get all researchers basic information.
     * path: /researcher_basic/
     * method: get
    */
   async getResearchersBasic(req: Request, res: Response): Promise<Response> {
    const query = `select getresearchersbasic('researchersCursor');`;
    const fetch = `FETCH ALL IN "researchersCursor";`;
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
     * Create new researcher.
     * path: /researcher/
     * method: post
     */
    async createResearcher(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const createPerson = `SELECT createperson($1,$2,$3,$4,$5,$6,$7,$8);`;
        const createResearcher = `SELECT createresearcher($1,$2);`;
        try {
            
            const personValues = [req.body.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates, req.body.phone_number, req.body.email, 'Investigador'];
            const researcherValues = [req.body.dni, req.body.id_inv_unit];

            await Queries.begin(client);
            await Queries.simpleTransactionContinous(createPerson, personValues, client);
            await Queries.simpleTransactionContinous(createResearcher, researcherValues, client);
            await Queries.commit(client);

            return res.status(200).json(
                {
                    msg: 'Researcher created'
                }
            );
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific researcher.
     * path: /researcher/:dni
     * method: put
     */
    async updateResearcher(req: Request, res: Response): Promise<Response> {
        const updateResearcher = `SELECT updateresearcher($1,$2,$3,$4,$5,$6,$7,$8);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [
                req.body.dni, req.body.name, req.body.lastname1, req.body.lastname2, 
                req.body.born_dates, req.body.phone_number, req.body.email, req.body.id_inv_unit
            ];

            await Queries.simpleTransaction(updateResearcher, values, client);

            return res.status(200).json(
                {
                    msg: 'Researcher updated'
                }
            );
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const researcherController = new ResearcherController();
export default researcherController;