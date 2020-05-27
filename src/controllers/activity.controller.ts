import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries'

export class ActivityController {

    /**
     * Create new activity.
     * path: /activity/
     * method: post
     */
    async createActivity(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createactivity($1,$2,$3);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.body.id_acti_type, req.body.id_project];

            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: "Activity created Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get all activities.
     * path: /activity/
     * method: get
     */
    async getActivities(req: Request, res: Response): Promise<Response> {
        const query = `select getactivities('activityCursor'); `;
        const fetch = `FETCH ALL IN "activityCursor";`;
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
     * Get specific activity.
     * path: /activity/:id
     * method: get
     */
    async getActivitybyId(req: Request, res: Response): Promise<Response> {
        const query = `select getactivitybyid($1,'activityCursor'); `;
        const fetch = `FETCH ALL IN "activityCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];
            const response = await Queries.simpleSelectWithParameter(query, id, fetch, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get specific activities by project id.
     * path: /activity/project/:id
     * method: get
     */
    async getActivitybyProjectId(req: Request, res: Response): Promise<Response> {
        const query = `select getactivitybyidproject($1,'activityCursor'); `;
        const fetch = `FETCH ALL IN "activityCursor";`;
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
     * Assign person to activity.
     * path: /activity/
     * method: post
     */
    async assignPersonActivity(req: Request, res: Response): Promise<Response> {
        const query = `SELECT assignpersontoactivity($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.dni, req.body.id_activity];

            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: "Person Assigned to activity Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get specific activities by project id.
     * path: /activity/project/:id
     * method: get
     */
    async getPersonsActivity(req: Request, res: Response): Promise<Response> {
        const query = `select getpersonsactivity($1,'activityCursor'); `;
        const fetch = `FETCH ALL IN "activityCursor";`;
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
}

const activityController = new ActivityController();
export default activityController;