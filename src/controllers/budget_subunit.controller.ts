
import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class BudgetSubUnitController {

    /**
     * Get all budget sub units.
     * path: /budget_subunit/
     * method: get
    */
    async getBudgetSubUnit(req: Request, res: Response): Promise<Response> {
        const query = `select getbudgetsubunits('budgetCursor');`;
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
     * Get all budget subunits enable.
     * path: /budgetsubunit_enable/
     * method: get
    */
    async getBudgetSubUnitEnable(req: Request, res: Response): Promise<Response> {
        const query = `select getbudgetsubunitsenable('budgetCursor'); `;
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
     * Get specific budget subunit.
     * path: /budget_subunit/:id
     * method: get
    */
    async getBudgetSubUnitbyId(req: Request, res: Response): Promise<Response> {
        const query = `select getbudgetsubunitbyid($1, 'budgetCursor'); `;
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
    async createBudgetSubUnit(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createbudgetsubunit($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name];
            await Queries.simpleTransaction(query, values, client);
            return res.status(200).json({
                msg: "Budget Subunit created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific budget subunit.
     * path: /budget_subunit/:id
     * method: put
    */
    async updateBudgetSubUnit(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatebudgetsubunit($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.params.id];
            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: `Budget Subunit modified succesfully`
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * Disable specific budget subunit.
     * path: /budget_subunit/:pid/disable
     * method: put
    */
    async disableBudgetSubUnit(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disablebudgetsubunit($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];
            await Queries.simpleTransaction(disable, values, client);
            return res.status(200).json({
                msg: 'Budget Subunit disabled'
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific budget subunit.
     * path: /budget_subunit/:id/enable
     * method: put
     */
    async enableBudgetSubUnit(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enablebudgetsubunit($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.id];
            await Queries.simpleTransaction(enable, values, client);
            return res.status(200).json({
                msg: 'Budget Subunit enabled'
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

}

const budgetSubUnitController = new BudgetSubUnitController();
export default budgetSubUnitController;

