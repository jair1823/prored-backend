import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class InvestigationUnitController {

    /**
     * Get all investigation units.
     * path: /investigation_unit/
     * method: get
    */
    async getInvestigation_Units(req: Request, res: Response): Promise<Response> {
        const query = `select getinvestigationunits('invCursor'); `;
        const fetch = `FETCH ALL IN "invCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const response = await Queries.simpleSelect(query, fetch, client);
            return res.status(200).json(response.rows);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

    /**
     * Get specific investigation unit.
     * path: /investigation_unit/:id
     * method: get
    */
    async getInvestigation_UnitbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getinvestigationunitbyid($1, 'invCursor'); `;
        const fetch = `FETCH ALL IN "invCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [parseInt(req.params.id)];
            const response = await Queries.simpleSelectWithParameter(query, id, fetch, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Create new investigation unit.
     * path: /investigation_unit/
     * method: post
    */
    async createInvestigation_Unit(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createinvestigation_unit($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Unidad de Investigación', 'Crear'];
            const values = [req.body.name, req.body.description];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: "Investigation Unit created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific investigation unit.
     * path: /investigation_unit/:id
     * method: put
    */
    async updateInvestigation_Unit(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updateinvestigation_unit($1,$2,$3)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Unidad de Investigación', 'Editar'];
            const values = [req.params.id, req.body.name, req.body.description];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                msg: `Investigation Unit modified succesfully`
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Disable specific Investigation Unit.
     * path: /investigation_unit/:id/disable
     * method: put
     */
    async disableInvestigation_Unit(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disableinvestigationunit($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];
            const log = [req.body.decoded.id_user, 'Unidad de Investigación', 'Inactivar'];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(disable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Investigation Unit disable'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific Investigation Unit.
     * path: /investigation_unit/:id/enable
     * method: put
     */
    async enableInvestigation_Unit(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enableinvestigationunit($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Unidad de Investigación', 'Activar'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(enable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Investigation Unit enable'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const invController = new InvestigationUnitController();
export default invController;