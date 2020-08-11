import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class PaperController {

    /**
     * Create Paper for a project.
     * path: /paper
     * method: post
     */

    async insertPaper(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createpaper($1,$2,$3,$4,$5,$6,$7,$8,$9);`;
        try {
            const log = [req.body.decoded.id_user, 'Ponencia', 'Crear'];
            const url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.id_project, req.body.paper_name,req.body.speaker,req.body.place,
                            req.body.type,req.body.country,req.body.date_assisted,req.file.filename, url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Paper inserted'
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
     * Create Paper with no file for a project.
     * path: /paper/nofile
     * method: post
     */

    async insertPaperNoFile(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createpaper($1,$2,$3,$4,$5,$6,$7,$8,$9);`;
        try {
            const log = [req.body.decoded.id_user, 'Ponencia', 'Crear'];
            const values = [req.body.id_project, req.body.paper_name,req.body.speaker,req.body.place,
                req.body.type,req.body.country,req.body.date_assisted,null, null];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Paper inserted'
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
     * Update Paper.
     * path: /paper/:id
     * method: put
     */

    async updatePaper(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const update = `SELECT updatepaper($1,$2,$3,$4,$5,$6,$7);`;
        try {
            const log = [req.body.decoded.id_user, 'Ponencia', 'Actualizar'];
            const values = [req.params.id, req.body.paper_name,req.body.speaker,req.body.place,
                req.body.type,req.body.country,req.body.date_assisted];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(update, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Paper updated'
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
     * Delete Paper file.
     * path: /paper/file/:id
     * method: delete
     */

    async deletePaperFile(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletepaperfile($1);`;
        const query = `select getpaperfile($1,'paperCursor');`;
        const fetch = `FETCH ALL IN "paperCursor";`;
        try {
            const log = [req.body.decoded.id_user, 'Ponencia', 'Borrar'];
            const id = [req.params.id];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, id, fetch, client);
            let message = "empty"
            let resultado = response.rows[0];
            if (resultado.file_path != null) {
                const p = resultado.file_path;
                console.log(p)
                let fullPath = path.join(__dirname + '../../../..' + '/public/' + p);
                fs.unlinkSync(fullPath);
                await Queries.simpleTransactionContinous(deleteD, id, client);
                message = "Paper file deleted";
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
     * Insert Paper file.
     * path: /paper/file/:id
     * method: post
     */

    async insertPaperFile(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT insertpaperfile($1,$2,$3);`;
        try {
            const log = [req.body.decoded.id_user, 'Ponencia', 'Crear'];
            let url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.params.id, req.file.filename, url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Paper file inserted'
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
     * Delete a Paper from a project.
     * path: /paper/:id
     * method: delete
     */

    async deletePaper(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletepaper($1);`;
        const query = `SELECT getpaper($1,'paperCursor');`;
        const fetch = `FETCH ALL IN "paperCursor";`;
        try {
            const log = [req.body.decoded.id_user, 'Ponencia', 'Borrar'];
            const id = [req.params.id];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, id, fetch, client);
            let message = "empty";
            let resultado = response.rows[0];
            if (resultado != undefined) {
                if(resultado.file_path !== null){
                    const p = resultado.file_path;
                    let fullPath = path.join(__dirname + '../../../..' + '/public/' + p);
                    fs.unlinkSync(fullPath);
                }
                await Queries.simpleTransactionContinous(deleteD, id, client);
                message = "Paper deleted";
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
     * Get Paper.
     * path: /paper/:id
     * method: get
     */

    async getPaper(req: Request, res: Response): Promise<Response> {
        const query = `select getpaper($1,'paperCursor');`;
        const fetch = `FETCH ALL IN "paperCursor";`;
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
     * Get Paper from project.
     * path: /paper/project/:id
     * method: get
     */

    async getPaperProject(req: Request, res: Response): Promise<Response> {
        const query = `select getpapersproject($1,'paperCursor');`;
        const fetch = `FETCH ALL IN "paperCursor";`;
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

const paperController = new PaperController();
export default paperController;