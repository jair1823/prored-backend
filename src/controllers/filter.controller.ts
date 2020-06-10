import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class FilterController {

    /**
     * Get projects with filters.
     * path: /filter/project
     * method: post
     */
    async getProjectsFilter(req: Request, res: Response): Promise<Response> {
        const query = `select projectfilter($1,$2,'projectCursor');`;
        const fetch = `FETCH ALL IN "projectCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_inv_unit, req.body.project_type];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get students with filters.
     * path: /filter/student
     * method: post
     */
    async getStudentFilter(req: Request, res: Response): Promise<Response> {
        const query = `select studentfilter($1,$2,$3,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.campus_code, req.body.career_code,req.body.status];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get researchers with filters.
     * path: /filter/student
     * method: post
     */
    async getResearcherFilter(req: Request, res: Response): Promise<Response> {
        const query = `select researcherfilter($1,$2,'researcherCursor');`;
        const fetch = `FETCH ALL IN "researcherCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_inv_unit,req.body.status];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get activity with filters when activity is from project.
     * path: /filter/activity/project
     * method: post
     */
    async getActivityFilter(req: Request, res: Response): Promise<Response> {
        const query = `select activityfilterproject($1,'activityCursor');`;
        const fetch = `FETCH ALL IN "activityCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_acti_type];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get activity with filters when activity is not from project.
     * path: /filter/activity/project
     * method: post
     */
    async getActivityNoProjectFilter(req: Request, res: Response): Promise<Response> {
        const query = `select activityfilternoproject($1,'activityCursor');`;
        const fetch = `FETCH ALL IN "activityCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_acti_type];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const filterController = new FilterController();
export default filterController;