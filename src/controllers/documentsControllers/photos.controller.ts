import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class PhotoController {

    /**
     * Create a Photo for an activity.
     * path: /photo
     * method: post
     */

    async insertPhotos(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createphoto($1,$2,$3,$4,$5);`;
        try {
            const files = JSON.stringify(req.files);
            const filesParsed = JSON.parse(files);
            const bodies = JSON.parse(req.body.data);
            await Queries.begin(client);
            for(let i = 0; i < bodies.length;i++){
                let url = `${req.body.tabla}/${filesParsed[i].filename}`;
                let values = [req.body.id_activity, bodies[i].date_taken, bodies[i].comment, filesParsed[i].filename, url];
                await Queries.simpleTransactionContinous(insert, values, client);
            }
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Photo inserted'
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
     * Delete a Photo from an activity.
     * path: /photo/:id
     * method: delete
     */

    async deletePhoto(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletephoto($1);`;
        const query = `SELECT getphoto($1,'photoCursor');`;
        const fetch = `FETCH ALL IN "photoCursor";`;
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
                message = "Photo deleted";
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
     * Get Photo.
     * path: /photo/:id
     * method: get
     */

    async getPhoto(req: Request, res: Response): Promise<Response> {
        const query = `select getphoto($1,'photoCursor');`;
        const fetch = `FETCH ALL IN "photoCursor";`;
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
     * Get Photos from activity.
     * path: /photo/activity/:id
     * method: get
     */

    async getPhotosActivity(req: Request, res: Response): Promise<Response> {
        const query = `select getphotosactivity($1,'photoCursor');`;
        const fetch = `FETCH ALL IN "photoCursor";`;
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

const photoController = new PhotoController();
export default photoController;