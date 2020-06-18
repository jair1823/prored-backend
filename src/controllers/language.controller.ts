import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class LanguageController {

    /**
     * Get all language.
     * path: /language
     * method: get
     */
    async getLanguages (req: Request, res: Response): Promise<Response> {

        const query = `select getlanguage('languagesCursor'); `;
        const fetch = `FETCH ALL IN "languagesCursor";`;
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
}

const languageController = new LanguageController();
export default languageController;