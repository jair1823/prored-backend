import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class EvaluationFormController {

    /**
     * Create an evaluation form for a person.
     * path: /evaluation_form
     * method: post
     */

    async insertForm(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createevaluationform($1,$2,$3,$4);`;
        try {
            const log = [req.body.decoded.id_user, 'Formulario de Evaluación', 'Crear'];
            const url = `${req.body.tabla}/${req.file.filename}`;
            const today = new Date().toISOString().slice(0, 10);
            const values = [req.body.dni, today, req.file.filename, url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Evaluation Form inserted'
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
     * Delete an evaluation form for a person.
     * path: /evaluation_form/:id
     * method: delete
     */

    async deleteForm(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deleteevaluationform($1);`;
        const query = `SELECT getevaluationform($1,'formCursor');`;
        const fetch = `FETCH ALL IN "formCursor";`;
        try {
            const log = [req.body.decoded.id_user, 'Formulario de Evaluación', 'Borrar'];
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
                await Queries.insertLog(log,client);
                message = "Evaluation Form deleted";
            }
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
     * Get an evaluation forms.
     * path: /evaluation_form/:id
     * method: get
     */

    async getForm(req: Request, res: Response): Promise<Response> {
        const query = `select getevaluationform($1,'formCursor');`;
        const fetch = `FETCH ALL IN "formCursor";`;
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
     * Get all the evaluation forms for a person.
     * path: /evaluation_form/person/:id
     * method: get
     */

    async getForms(req: Request, res: Response): Promise<Response> {
        const query = `select getevaluationformperson($1,'formCursor');`;
        const fetch = `FETCH ALL IN "formCursor";`;
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

const evaluationFormController = new EvaluationFormController();
export default evaluationFormController;