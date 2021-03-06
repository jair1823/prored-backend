import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class BudgetUnitController {

    /**
     * Get all budget units.
     * path: /budget_unit/
     * method: get
    */
    async getBudgetUnit(req: Request, res: Response): Promise<Response> {
        const query = `select getbudgetunits('budgetCursor');`;
        const fetch = `FETCH ALL IN "budgetCursor";`;
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
     * Get all budget units enable.
     * path: /budgetunit_enable/
     * method: get
    */
    async getBudgetUnitEnable(req: Request, res: Response): Promise<Response> {
        const query = `select getbudgetunitsenable('budgetCursor'); `;
        const fetch = `FETCH ALL IN "budgetCursor";`;
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
     * Get specific budget unit.
     * path: /budget_unit/:id
     * method: get
    */
    async getBudgetUnitbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getbudgetunitbyid($1, 'budgetCursor'); `;
        const fetch = `FETCH ALL IN "budgetCursor";`;
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
     * Create new budgetunit.
     * path: /budget_unit/
     * method: post
    */
    async createBudgetUnit(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createbudgetunit($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Partida', 'Crear'];
            const values = [req.body.id, req.body.name];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                msg: "Budget Unit created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific budget unit.
     * path: /budget_unit/:id
     * method: put
    */
    async updateBudgetUnit(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatebudgetunit($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Partida', 'Editar'];
            const values = [req.body.name, req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                msg: `Budget Unit modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * Disable specific budget unit.
     * path: /budget_unit/:pid/disable
     * method: put
    */
    async disableBudgetUnit(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disablebudgetunit($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Partida', 'Inactivar'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(disable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                msg: 'Budget Unit disabled'
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific budget unit.
     * path: /budget_unit/:id/enable
     * method: put
     */
    async enableBudgetUnit(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enablebudgetunit($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Partida', 'Activar'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(enable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                msg: 'Budget Unit enabled'
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * See if a budget unit code already exists in the database
     * path: /budget_unit/:id/exists
     * method: get
     */
    async checkBudgetUnitExists(req: Request, res: Response): Promise<Response> {
        const query = `select budgetUnitExists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const email = [req.params.id];
            const response = await Queries.simpleSelectNoCursor(query, email, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }
}

const budgetUnitController = new BudgetUnitController();
export default budgetUnitController;