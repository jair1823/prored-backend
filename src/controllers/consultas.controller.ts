import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class ConsultasController {

    /**
     * See if a dni already exists in the database
     * path: /person/exists/:id
     * method: get
     */
    async checkPersonExists(req: Request, res: Response): Promise<Response> {
        const query = `select personexists($1);`;
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

    /**
     * Get all persons basic information.
     * path: /person/basic
     * method: get
    */
    async getPersonsBasic(req: Request, res: Response): Promise<Response> {
        const query = `select getPersons('personsCursor');`;
        const fetch = `FETCH ALL IN "personsCursor";`;
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
     * Get all logs.
     * path: /logs/
     * method: get
    */
    async getLogs(req: Request, res: Response): Promise<Response> {
        const query = `select getlogs('logCursor'); `;
        const fetch = `FETCH ALL IN "logCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const response = await Queries.simpleSelect(query, fetch, client);
            return res.status(200).json(response.rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Generate a financial report for a set of dates.
     * path: /report/students
     * method: post
    */
    async studentsReport(req: Request, res: Response): Promise<Response> {
        const query = `select financialStudentsReport($1,$2,'reportCursor'); `;
        const fetch = `FETCH ALL IN "reportCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.startDate, req.body.endDate];
            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);
            return res.status(200).json(response.rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Generate a financial for students report for a set of dates.
     * path: /report/projects
     * method: post
    */
    async projectsReport(req: Request, res: Response): Promise<Response> {
        const query = `select financialProjectsReport($1,$2,'reportCursor'); `;
        const fetch = `FETCH ALL IN "reportCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.startDate, req.body.endDate];
            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);
            return res.status(200).json(response.rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }
}

const consultaController = new ConsultasController();
export default consultaController;