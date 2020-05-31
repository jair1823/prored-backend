import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class ListOfAssistanceController {

    /**
     * Create a List of assitance from an activity.
     * path: /list
     * method: post
     */

    async insertList(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createlistofassistance($1,$2,$3,$4);`;
        try {
            const url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.id_activity, req.body.date_passed, req.file.filename, url];
            await Queries.simpleTransaction(insert, values, client);
            return res.status(200).json(
                {
                    msg: 'List of Assistance inserted'
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
     * Delete a List of assistance from an activity.
     * path: /list/:id
     * method: delete
     */

    async deleteList(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletelistofassistance($1);`;
        const query = `SELECT getlistofassistance($1,'listCursor');`;
        const fetch = `FETCH ALL IN "listCursor";`;
        try {
            const id = [req.params.id];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, id, fetch, client);
            let message = "empty";
            let resultado = response.rows[0];
            if (resultado != undefined) {
                const p = resultado.file_path;
                let fullPath = path.join(__dirname + '../../../..' + '/public/' + p);
                fs.unlinkSync(fullPath);
                await Queries.simpleTransaction(deleteD, id, client);
                message = "List of Assitance deleted";
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
     * Get List of Assistance.
     * path: /list/:id
     * method: get
     */

    async getList(req: Request, res: Response): Promise<Response> {
        const query = `select getlistofassistance($1,'listCursor');`;
        const fetch = `FETCH ALL IN "listCursor";`;
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

    /**
     * Get List of assistance from project.
     * path: /list/activity/:id
     * method: get
     */

    async getListActivity(req: Request, res: Response): Promise<Response> {
        const query = `select getlistofassistanceactivity($1,'listCursor');`;
        const fetch = `FETCH ALL IN "listCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.id];
            const response = await Queries.simpleSelectWithParameter(query, dni, fetch, client);
            const rows = response.rows;
            return res.json(rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

}

const listOfAssistanceController = new ListOfAssistanceController();
export default listOfAssistanceController;