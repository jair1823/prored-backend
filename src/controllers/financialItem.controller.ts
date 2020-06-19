

import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class FinancialItemController {

    /**
     * Get all financial item.
     * path: /financial_item/
     * method: get
    */
    async getFinancialItem(req: Request, res: Response): Promise<Response> {
        const query = `select getfinancialitem('financialCursor');`;
        const fetch = `FETCH ALL IN "financialCursor";`;
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
     * Get all budget units by project and activity.
     * path: /financial_item/specific
     * method: get
    */
    async getFinancialItemSpecific(req: Request, res: Response): Promise<Response> {
        const query = `select getfinancialitembyprojectactivity($1,$2,'financialCursor'); `;
        const fetch = `FETCH ALL IN "financialCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const id = [req.body.id_project,req.body.id_activity];
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
     * Get specific financial item.
     * path: /financial_item/:id
     * method: get
    */
    async getFinancialItembyId(req: Request, res: Response): Promise<Response> {
        const query = `select getfinancialitembyid($1, 'financialCursor'); `;
        const fetch = `FETCH ALL IN "financialCursor";`;
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
     * Create new financial item.
     * path: /financial_item/
     * method: post
    */
    async createFinancialItem(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createfinancialitem($1,$2,$3,$4,$5,$6,$7,$8)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.date,req.body.amount,req.body.type,req.body.idproject,
                            req.body.idactivity,req.body.dni,req.body.unit,req.body.subunit];
            await Queries.simpleTransaction(query, values, client);
            return res.json({
                msg: "Financial Item created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific financial item.
     * path: /financial_item/:id
     * method: put
    */
    async updateFinancialItem(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updatebudgetunit($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.params.id , req.body.date ,req.body.amount ,req.body.type,
                req.body.idproject ,req.body.idactivity ,req.body.dni ,req.body.punit, req.body.subunit   ];
            await Queries.simpleTransaction(query, values, client);
            return res.json({
                msg: `Financial Item modified succesfully`
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }



}

const financial_item_controller = new FinancialItemController();
export default financial_item_controller;