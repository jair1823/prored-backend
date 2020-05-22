import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class ConsultasController {

    /**
     * See if a dni already exists in the database
     * path: /person/exists/:id
     * method: get
     */
    async checkPersonExists(req: Request, res: Response): Promise<Response> {
        const query = `select personexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [req.params.id];
            const response = await Queries.simpleSelectNoCursor(query, id, client);

            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const consultaController = new ConsultasController();
export default consultaController;