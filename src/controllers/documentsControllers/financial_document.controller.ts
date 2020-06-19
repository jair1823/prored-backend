import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../../database/connection';
import Queries from '../../database/Queries'
import fs from 'fs';
import path from 'path';

export class FinancialDocumentController {

    /**
     * Create a financial document from a financial item.
     * path: /finantial_document
     * method: post
     */

    async insertFinantialDocument(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT createfinancialdocument($1,$2,$3);`;
        try {
            const url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.id_financial_item, req.file.filename, url];
            await Queries.simpleTransaction(insert, values, client);
            return res.status(200).json(
                {
                    msg: 'Financial Document inserted'
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
     * Delete a financial document from a financial item.
     * path: /finantial_document/:id
     * method: delete
     */

    async deleteFinancialDocument(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deletefinancialdocument($1);`;
        const query = `SELECT getfinancialdocument($1,'fdCursor');`;
        const fetch = `FETCH ALL IN "fdCursor";`;
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
                message = "Financial Document deleted";
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
     * Get financial document.
     * path: /finantial_document/:id
     * method: get
     */

    async getFinancialDocument(req: Request, res: Response): Promise<Response> {
        const query = `select getfinancialdocument($1,'fdCursor');`;
        const fetch = `FETCH ALL IN "fdCursor";`;
        const client = await pool.connect();
        try {
            const id = [req.params.id];
            const response = await Queries.simpleSelectWithParameter(query, id, fetch, client);
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
     * Get financial documents from a financial item.
     * path: /finantial_document/item/:id
     * method: get
     */

    async getFinancialDocumentItem(req: Request, res: Response): Promise<Response> {
        const query = `select getfinancialdocumentfromfinancialitem($1,'fdCursor');`;
        const fetch = `FETCH ALL IN "fdCursor";`;
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

const financialDocumentController = new FinancialDocumentController();
export default financialDocumentController;