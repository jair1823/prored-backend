import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

/**
 * Delete a gannt Tasks.
*/

async function deleteGantt_Task(id_gantt: any) {
    const query = `SELECT deletegantt_tasks($1);`;
    const client: PoolClient = await pool.connect();
    try {
        const values = [id_gantt];
        await Queries.simpleTransaction(query, values, client);
        return true;

    } catch (error) {

        await Queries.simpleError(client, error);
        console.log("Internal Server Error")
        return false;
    }
}


async function createGantt_Task_Function(gantt_list: any) {
    const query = `SELECT creategantt_task($1,$2,$3,$4,$5);`;
    const client: PoolClient = await pool.connect();
    try {
        const listaGanttLine = gantt_list
        await Queries.begin(client);
        for (let i = 0; i < listaGanttLine.length; i++) {
            const values = [listaGanttLine[i].id_gantt, listaGanttLine[i].task_name,
            listaGanttLine[i].description, listaGanttLine[i].start_date,
            listaGanttLine[i].end_date
            ];
            await Queries.simpleTransactionContinous(query, values, client);
        }
        // end for 
        await Queries.commit(client);
        console.log("Gantt Tasks created Succesfully")
        return true;


    } catch (error) {

        await Queries.simpleError(client, error);
        console.log("Internal Server Error")
        return false;
    }
}





export class GanttController {

    /**
     * Create period.
     * path: /period/
     * method: post
    */

    async createPeriod(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createperiod($1)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name];
            await Queries.simpleTransaction(query, values, client);

            return res.json({
                msg: "Period created Succesfully"
            });
        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * Update period.
     * path: /period/:id
     * method: put
    */


    async updatePeriod(req: Request, res: Response): Promise<Response> {
        const query = `SELECT updateperiod($1,$2)`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.name, req.params.id];
            await Queries.simpleTransaction(query, values, client);
            return res.json({
                msg: `Period modified succesfully`
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * Get all periods.
     * path: /period/
     * method: get
    */

    async getPeriods(req: Request, res: Response): Promise<Response> {
        const query = `select getperiods('periodsCursor');`;
        const fetch = `FETCH ALL IN "periodsCursor";`;
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
     * See if a period already exists in the database
     * path: /period/exists
     * method: get
     */
    async checkPeriodExists(req: Request, res: Response): Promise<Response> {
        const query = `select periodexists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const name = [req.body.name];
            const response = await Queries.simpleSelectNoCursor(query, name, client);

            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * Create gantt
     * path: /gantt/
     * method: post
    */
   async createGantt(req: Request, res: Response): Promise<Response> {
    const query = `SELECT creategantt($1,$2,'ganttCursor')`;
    const fetch = `FETCH ALL IN "ganttCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values =  [req.body.rel_code, req.body.id_period];
            const response = await Queries.insertWithReturn(query, values, fetch, client);
            return res.json(
                response.rows[0]
            );
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get all gantts by project.
     * path: /gantt/:id
     * method: get
     */

    async getGantts(req: Request, res: Response): Promise<Response> {
        const getResearcher = `select getgantts($1,'ganttsCursor');`;
        const fetchResearcher = `FETCH ALL IN "ganttsCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.params.id];
            const gantts = await Queries.simpleSelectWithParameter(getResearcher, values, fetchResearcher, client);
            return res.status(200).json(gantts.rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Create a gannt Task.
     * path: /gantt_task/
     * method: post
    */

    async createGantt_Task(req: Request, res: Response): Promise<Response> {
        const query = `SELECT creategantt_task($1,$2,$3,$4,$5);`;
        const client: PoolClient = await pool.connect();
        try {
            const listaGanttLine = req.body.gantt_list
            await Queries.begin(client);
            for (let i = 0; i < listaGanttLine.length; i++) {
                const values = [listaGanttLine[i].id_gantt, listaGanttLine[i].task_name,
                listaGanttLine[i].description, listaGanttLine[i].start_date,
                listaGanttLine[i].end_date
                ];
                await Queries.simpleTransactionContinous(query, values, client);
            }
            // end for 
            await Queries.commit(client);
            return res.json({
                msg: "Gantt Tasks created Succesfully"
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }



    /**
     * Update gantt tasks of a gantt
     * path: /gantt_task/
     * method: put
     */

    async updateGantt_Task(req: Request, res: Response): Promise<Response> {
        try {
            const listaGanttLine = req.body.gantt_list;
            const id_gantt = req.params.id_gantt;
            deleteGantt_Task(id_gantt);
            createGantt_Task_Function(listaGanttLine)
            return res.json({
                msg: "Gantt Tasks updated Succesfully"
            });
        } catch (error) {

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }




    /**
     * Get gantt tasks of a gantt
     * path: /gantt_task/
     * method: get
     */


    async getGantt_Tasks(req: Request, res: Response): Promise<Response> {
        const getResearcher = `select getgantt_tasks($1,'ganttsCursor');`;
        const fetchResearcher = `FETCH ALL IN "ganttsCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.params.id];
            const gantts = await Queries.simpleSelectWithParameter(getResearcher, values, fetchResearcher, client);
            return res.status(200).json(gantts.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }


    /**
     * See if a dni already exists in the database
     * path: /person/exists/:id
     * method: get
     */
    async checkGanttExists(req: Request, res: Response): Promise<Response> {
        const query = `select ganttexists($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.rel_code,req.body.id_period];
            const response = await Queries.simpleSelectNoCursor(query, values, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }



}

const ganttController = new GanttController();
export default ganttController;
