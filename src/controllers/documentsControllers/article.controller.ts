import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class ArticleController {

    /**
     * Create Article for a project.
     * path: /article
     * method: post
     */

    async insertArticle(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createarticle($1,$2,$3,$4,$5,$6,$7,$8,$9);`;
        try {
            const log = [req.body.decoded.id_user, 'Artículo', 'Crear'];
            const url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.id_project, req.body.title,req.body.key_words,req.body.abstract,
                            req.body.authors,req.body.magazine,req.body.url,req.file.filename, url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Article inserted'
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
     * Create Article with no file for a project.
     * path: /article/nofile
     * method: post
     */

    async insertArticleNoFile(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createarticle($1,$2,$3,$4,$5,$6,$7,$8,$9);`;
        try {
            const log = [req.body.decoded.id_user, 'Artículo', 'Crear'];
            const values = [req.body.id_project, req.body.title,req.body.key_words,req.body.abstract,
                            req.body.authors,req.body.magazine,req.body.url,null, null];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Article inserted'
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
     * Update Article.
     * path: /article/:id
     * method: put
     */

    async updateArticle(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const update = `SELECT updatearticle($1,$2,$3,$4,$5,$6,$7);`;
        try {
            const log = [req.body.decoded.id_user, 'Artículo', 'Actualizar'];
            const values = [req.params.id, req.body.title,req.body.key_words,req.body.abstract,
                            req.body.authors,req.body.magazine,req.body.url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(update, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Article updated'
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
     * Delete Article file.
     * path: /article/file/:id
     * method: delete
     */

    async deleteArticleFile(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletearticlefile($1);`;
        const query = `select getarticlefile($1,'articleCursor');`;
        const fetch = `FETCH ALL IN "articleCursor";`;
        try {
            const log = [req.body.decoded.id_user, 'Artículo', 'Borrar'];
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
                message = "Article file deleted";
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
     * Insert article file.
     * path: /article/file/:id
     * method: post
     */

    async insertArticleFile(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT insertarticlefile($1,$2,$3);`;
        try {
            const log = [req.body.decoded.id_user, 'Artículo', 'Crear'];
            let url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.params.id, req.file.filename, url];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(insert, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'Article file inserted'
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
     * Delete a Article from a project.
     * path: /article/:id
     * method: delete
     */

    async deleteArticle(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletearticle($1);`;
        const query = `SELECT getarticle($1,'articleCursor');`;
        const fetch = `FETCH ALL IN "articleCursor";`;
        try {
            const log = [req.body.decoded.id_user, 'Artículo', 'Borrar'];
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
                message = "Article deleted";
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
     * Get Article.
     * path: /article/:id
     * method: get
     */

    async getArticle(req: Request, res: Response): Promise<Response> {
        const query = `select getarticle($1,'articleCursor');`;
        const fetch = `FETCH ALL IN "articleCursor";`;
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
     * Get Article from project.
     * path: /article/project/:id
     * method: get
     */

    async getArticleProject(req: Request, res: Response): Promise<Response> {
        const query = `select getarticlesproject($1,'articleCursor');`;
        const fetch = `FETCH ALL IN "articleCursor";`;
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

const articleController = new ArticleController();
export default articleController;