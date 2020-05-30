import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries'
import fs from 'fs';
import path from 'path';

export class DocumentController {

    /**
     * Create a Project Form from a project.
     * path: /project_form
     * method: post
     */

    async insertProjectForm(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createprojectform($1,$2,$3,$4);`;
        try {
            const url = `${req.body.tabla}/${req.file.filename}`;
            const today = new Date().toISOString().slice(0, 10)
            const values = [req.body.id_project,today, req.file.filename, url];
            await Queries.simpleTransaction(insert, values, client);
            return res.status(200).json(
                {
                    msg: 'Project Form inserted'
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
     * Delete a Project Form from a project.
     * path: /project_form/:id
     * method: post
     */

    async deleteProjectForm(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deleteprojectform($1);`;
        const query = `SELECT getprojectform($1,'pfCursor');`;
        const fetch = `FETCH ALL IN "pfCursor";`;
        try {
            const id = [req.params.id];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, id, fetch, client);
            let message = "empty"
            let resultado = response.rows[0];
            if (resultado != undefined) {
                console.log("Entre")
                const p = resultado.file_path;
                let fullPath = path.join(__dirname + '../../..' + '/public/' + p);
                fs.unlinkSync(fullPath);
                await Queries.simpleTransaction(deleteD, id, client);
                message = "Project Form deleted";
            }
            return res.status(200).json(
                {
                    msg: message
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
     * Get Project Form.
     * path: /project_form/:id
     * method: get
     */

    async getProjectForm(req: Request, res: Response): Promise<Response> {
        const query = `select getprojectform($1,'pfCursor');`;
        const fetch = `FETCH ALL IN "pfCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.id];
            const response = await Queries.simpleSelectWithParameter(query, dni, fetch, client);
            const rows = response.rows[0];
            if (rows === undefined) {
                return res.json({
                    msg: "empty"
                });
            }
            return res.json(rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const docuemntController = new DocumentController();
export default docuemntController;