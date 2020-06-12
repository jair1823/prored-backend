import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class FilterController {

    /**
     * Get projects with filters.
     * path: /filter/project
     * method: post
     */
    async getProjectsFilter(req: Request, res: Response): Promise<Response> {
        const query = `select projectfilter($1,$2,'projectCursor');`;
        const fetch = `FETCH ALL IN "projectCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_inv_unit, req.body.project_type];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get students with filters.
     * path: /filter/student
     * method: post
     */
    async getStudentFilter(req: Request, res: Response): Promise<Response> {
        const query = `select studentfilter($1,$2,$3,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        const query2 = `select studentfilternocareer($1,$2,'studentCursor');`;
        const client: PoolClient = await pool.connect();
        try {

            let response : any;
            if(req.body.career_code !== null){
                const values = [req.body.campus_code, req.body.career_code,req.body.status];
                await Queries.begin(client);
                const result = await Queries.simpleSelectWithParameterContinous(query, values, fetch, client);
                for(let i = 0;i<result.rowCount;i++){
                    let res : string[] = [];
                    const fetchCarees = `FETCH ALL IN "careersCursor${result.rows[i].dni}";`;
                    let getCarees = `select getcareersbydni($1,'careersCursor${result.rows[i].dni}');`;
                    let resultadocareer = await Queries.simpleSelectWithParameterContinous(getCarees, [result.rows[i].dni], fetchCarees, client);
                    resultadocareer.rows.map(async (c:any) => {
                        res.push(c.name)
                    });
                    result.rows[i]["career_name"] = res;
                }
                await Queries.rollback(client);
                response = result;
            }
            else{
                await Queries.begin(client);
                const values = [req.body.campus_code,req.body.status];

                const result = await Queries.simpleSelectWithParameterContinous(query2, values, fetch, client);
                for(let i = 0;i<result.rowCount;i++){
                    let res : string[] = [];
                    const fetchCarees = `FETCH ALL IN "careersCursor${result.rows[i].dni}";`;
                    let getCarees = `select getcareersbydni($1,'careersCursor${result.rows[i].dni}');`;
                    let resultadocareer = await Queries.simpleSelectWithParameterContinous(getCarees, [result.rows[i].dni], fetchCarees, client);
                    resultadocareer.rows.map(async (c:any) => {
                        res.push(c.name)
                    });
                    result.rows[i]["career_name"] = res;
                }
                await Queries.rollback(client);
                response = result;
            }
            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get researchers with filters.
     * path: /filter/student
     * method: post
     */
    async getResearcherFilter(req: Request, res: Response): Promise<Response> {
        const query = `select researcherfilter($1,$2,'researcherCursor');`;
        const fetch = `FETCH ALL IN "researcherCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_inv_unit,req.body.status];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get activity with filters when activity is from project.
     * path: /filter/activity/project
     * method: post
     */
    async getActivityFilter(req: Request, res: Response): Promise<Response> {
        const query = `select activityfilterproject($1,'activityCursor');`;
        const fetch = `FETCH ALL IN "activityCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_acti_type];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get activity with filters when activity is not from project.
     * path: /filter/activity/project
     * method: post
     */
    async getActivityNoProjectFilter(req: Request, res: Response): Promise<Response> {
        const query = `select activityfilternoproject($1,'activityCursor');`;
        const fetch = `FETCH ALL IN "activityCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.id_acti_type];

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const filterController = new FilterController();
export default filterController;