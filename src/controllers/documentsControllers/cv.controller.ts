import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class CVController {


    /**
     * Insert CV to student.
     * path: /studentcv
     * method: post
     */

    async insertCV(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT insertCV($1,$2,$3);`;
        try {
            let url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.dni, url, req.file.filename];
            await Queries.simpleTransaction(insert, values, client);
            return res.status(200).json(
                {
                    msg: 'CV inserted'
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
     * Update CV to student.
     * path: /studentcv
     * method: put
     */

    async updateCV(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        // const deleteD = `SELECT deleteCV($1);`;
        // const insert = `SELECT insertCV($1,$2,$3);`;
        const update = `SELECT updateCV($1,$2,$3);`
        try {
            const p = req.body.path;
            let fullPath = path.join(__dirname + '../../..' + '/public/' + p);
            fs.unlinkSync(fullPath);
            //const valuesD = [req.body.dni];
            // await Queries.begin(client);
            // await Queries.simpleTransactionContinous(deleteD, valuesD, client);
            let url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.dni, url, req.file.filename];
            await Queries.simpleTransaction(update, values, client);
            // await Queries.simpleTransactionContinous(insert, values, client);
            // await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'CV updated'
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
     * Delete CV from student.
     * path: /studentcv/:dni
     * method: delete
     */

    async deleteCV(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deleteCV($1);`;
        const query = `select getcv($1,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        try {
            const dni = [req.params.dni];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, dni, fetch, client);
            let message = "empty"
            let resultado = response.rows[0];
            if (resultado != undefined) {
                const p = resultado.file_path;
                let fullPath = path.join(__dirname + '../../../..' + '/public/' + p);
                fs.unlinkSync(fullPath);
                await Queries.simpleTransaction(deleteD, dni, client);
                message = "CV deleted";
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
     * Get student cv.
     * path: /studentcv/:dni
     * method: get
     */
    async getStudentCV(req: Request, res: Response): Promise<Response> {
        const query = `select getcv($1,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.dni];
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

}

const cvController = new CVController();
export default cvController;