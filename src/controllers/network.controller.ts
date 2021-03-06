import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class NetworkController {

    /**
     * Get all networks.
     * path: /network
     * method: get
    */
    async getNetworks(req: Request, res: Response): Promise<Response> {
        const query = `select getnetworks('networksCursor'); `;
        const fetch = `FETCH ALL IN "networksCursor";`;
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

    /**
     * Get all networks Enabled.
     * path: /network
     * method: get
    */
    async getNetworksEnable(req: Request, res: Response): Promise<Response> {
        const query = `select getnetworksEnable('networksCursor'); `;
        const fetch = `FETCH ALL IN "networksCursor";`;
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

    /**
     * Get specific network.
     * path: /network/:id
     * method: get
    */
    async getNetworkbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getnetworksbyid($1,'networksCursor');`;
        const fetch = `FETCH ALL IN "networksCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];

            const response = await Queries.simpleSelectWithParameter(query, id, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Create new network.
     * path: /network
     * method: post
    */
    async createNetwork(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createnetwork($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Redes Asociadas', 'Crear'];
            const values = [req.body.name, req.body.type];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: "Network created Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific network.
     * path: /network/:id
     * method: put
     */
    async updateNetwork(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatenetwork($1,$2,$3)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Redes Asociadas', 'Editar'];
            const values = [req.body.name, req.body.type, parseInt(req.params.id)];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: `Network modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Delete specific network.
     * path: /network/:id
     * method: delete
     */
    async deleteNetwork(req: Request, res: Response): Promise<Response> {
        const query = `SELECT deletenetwork($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Redes Asociadas', 'Borrar'];
            const id = [parseInt(req.params.id)];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, id, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: `Network deleted succesfuly`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }




    /**
         * Disable specific network.
         * path: /network/:pid/disable
         * method: put
    */
    async disableNetwork(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disablenetwork($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Redes Asociadas', 'Inactivar'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(disable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Network disabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific network.
     * path: /network/:id/enable
     * method: put
     */
    async enableNetwork(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enablenetwork($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Redes Asociadas', 'Activar'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(enable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Network enabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

}

const networkController = new NetworkController();
export default networkController;