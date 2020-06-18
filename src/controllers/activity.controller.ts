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
        const query = `SELECT createactivity($1,$2,$3,'activityCursor');`;
        const fetch = `FETCH ALL IN "activityCursor";`;
        const assign = `SELECT assignpersontoactivity($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            await Queries.begin(client);
            const values = [req.body.name, req.body.id_acti_type, req.body.id_project];

            const response = await Queries.insertWithReturnContinous(query, values, fetch, client);

            const persons: any = req.body.persons;

            persons.map(async (p: any) => {
                await Queries.simpleTransactionContinous(assign, [p.dni, response.rows[0].id_activity], client);
            });
            await Queries.commit(client);
            return res.json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific activity.
     * path: /activity/:id
     * method: put
    */
    async updateActivity(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updateactivity($1,$2,$3,$4)`;
        const assign = `SELECT assignpersontoactivity($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [parseInt(req.params.id), req.body.name, req.body.id_acti_type, req.body.id_project];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);

            const persons: any = req.body.persons;

            persons.map(async (p: any) => {
                await Queries.simpleTransactionContinous(assign, [p.dni, parseInt(req.params.id)], client);
            });

            await Queries.commit(client);
            return res.json({
                msg: `Activity modified succesfully`
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
     * Get all activities.
     * path: /activity/
     * method: get
     */
    async getActivitiesNoProject(req: Request, res: Response): Promise<Response> {
        const query = `select getactivitiesnoproject('activityCursor'); `;
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

    /**
     * Create new activity type.
     * path: /activity/type
     * method: post
    */
    async createActivityType(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createactivitytype($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name];
            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: "Activity Type created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get all activity types.
     * path: /type
     * method: get
    */
    async getActivityType(req: Request, res: Response): Promise<Response> {
        const query = `select getactivitytypes('acttypeCursor'); `;
        const fetch = `FETCH ALL IN "acttypeCursor";`;
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
     * Get all persons not assigned to a specific activity.
     * path: /activity/persons/not/:id
     * method: get
    */
   async getPersonsNotInActivity(req: Request, res: Response): Promise<Response> {
    const query = `select getpersonsnotinactivity($1,'activityCursor');`;
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
     * Update specific activity type.
     * path: /activity/type/:id
     * method: put
    */
    async updateActivityType(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updateactivitytype($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.params.id,req.body.name];

            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: `Activity Type modified succesfully`
            });
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