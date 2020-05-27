import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class ProjectController {

    /**
     * Create new project.
     * path: /project
     * method: post
    */
    async createProject(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createproject($1,$2,$3,$4)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.inv_unit, req.body.name, req.body.code_manage, req.body.project_type];
            await Queries.simpleTransaction(query, values, client);
            return res.json({
                msg: "Project created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get all projects.
     * path: /project
     * method: get
    */
    async getProjects(req: Request, res: Response): Promise<Response> {
        const query = `select getprojects('projectsCursor'); `;
        const fetch = `FETCH ALL IN "projectsCursor";`;
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
     * Get specific project.
     * path: /project/:id
     * method: get
    */
    async getProjectbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getprojectbyid($1,'projectCursor');`;
        const fetch = `FETCH ALL IN "projectCursor";`;
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
     * Update specific project.
     * path: /project/:id
     * method: put
     */
    async updateProject(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updateproject($1,$2,$3,$4,$5)`;
        const client: PoolClient = await pool.connect();
        try {

            const values = [parseInt(req.params.id), req.body.inv_unit, req.body.name, req.body.code_manage, req.body.project_type];

            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: `Projecupdateprojectt modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Assign a person to project.
     * path: /project/assign
     * method: post
    */
    async assignPersonProject(req: Request, res: Response): Promise<Response> {
        const query = `SELECT assignpersonproject($1,$2,$3)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.dni, req.body.id_project, req.body.role];
            await Queries.simpleTransaction(query, values, client);
            return res.json({
                msg: "Person assigned to project Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Assign a person to project.
     * path: /project
     * method: post
    */
    async getPersonsProject(req: Request, res: Response): Promise<Response> {
        const query = `select getpersonsproject($1,'projectCursor');`;
        const fetch = `FETCH ALL IN "projectCursor";`;
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

const projectController = new ProjectController();
export default projectController;