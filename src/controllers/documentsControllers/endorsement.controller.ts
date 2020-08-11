import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class EndorsementController {

    /**
     * Create a Endorsement from a project.
     * path: /endorsement
     * method: post
     */

    async insertEndorsement(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createendorsement($1,$2,$3,$4);`;
        try {
            const log = [req.body.decoded.id_user, 'Aval', 'Crear'];
            const url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.id_project, req.body.endorsement_type, req.file.filename, url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Endorsement inserted'
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
     * Delete a Endorsement from a project.
     * path: /endorsement/:id
     * method: delete
     */

    async deleteEndorsement(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deleteendorsement($1);`;
        const query = `SELECT getendorsement($1,'endCursor');`;
        const fetch = `FETCH ALL IN "endCursor";`;
        try {
            const log = [req.body.decoded.id_user, 'Aval', 'Crear'];
            const id = [req.params.id];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, id, fetch, client);
            let message = "empty";
            let resultado = response.rows[0];
            if (resultado != undefined) {
                const p = resultado.file_path;
                let fullPath = path.join(__dirname + '../../../..' + '/public/' + p);
                fs.unlinkSync(fullPath);
                await Queries.simpleTransactionContinous(deleteD, id, client);
                message = "Endorsement deleted";
            }
            await Queries.insertLog(log,client);
            await Queries.commit(client);
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
     * Get Endorsement.
     * path: /endorsement/:id
     * method: get
     */

    async getEndorsement(req: Request, res: Response): Promise<Response> {
        const query = `select getendorsement($1,'endCursor');`;
        const fetch = `FETCH ALL IN "endCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.id];
            const response = await Queries.simpleSelectWithParameter(query, dni, fetch, client);
            const rows = response.rows[0];
            if (rows === undefined) {
                return res.status(200).json({
                    msg: "empty"
                });
            }
            return res.status(200).json(rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get Endorsements from project.
     * path: /endorsement/project/:id
     * method: get
     */

    async getEndorsementsProject(req: Request, res: Response): Promise<Response> {
        const query = `select getendorsementsproject($1,'endCursor');`;
        const fetch = `FETCH ALL IN "endCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.id];
            const response = await Queries.simpleSelectWithParameter(query, dni, fetch, client);
            const rows = response.rows;
            return res.status(200).json(rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

}

const endorsementController = new EndorsementController();
export default endorsementController;