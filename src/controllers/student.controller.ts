import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';
import fs from 'fs';
import path from 'path';

export class StudentController {

    /**
     * Get all enable students.
     * path: /student/
     * method: get
    */
    async getStudents(req: Request, res: Response): Promise<Response> {
        const query = `select getstudents('studentsCursor');`;
        const fetch = `FETCH ALL IN "studentsCursor";`;
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
     * Get all students no matter status.
     * path: /student_all/
     * method: get
     */
    async getStudentsAll(req: Request, res: Response): Promise<Response> {
        const query = `select getstudentsall('studentsCursor');`;
        const fetch = `FETCH ALL IN "studentsCursor";`;
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
     * Get specific enable student.
     * path: /student/:dni
     * method: get
     */
    async getStudentByDni(req: Request, res: Response): Promise<Response> {
        const getStudent = `select getstudentbydni($1,'studentCursor');`;
        const fetchStudent = `FETCH ALL IN "studentCursor";`;

        const getCarees = `select getcareersbydni($1,'careersCursor');`;
        const fetchCarees = `FETCH ALL IN "careersCursor";`;

        const getNetworks = `select getnetworksbydni($1,'networksCursor');`;
        const fetchNetworks = `FETCH ALL IN "networksCursor";`;

        const getLanguages = `select getlanguagesbydni($1,'languagesCursor');`;
        const fetchLanguages = `FETCH ALL IN "languagesCursor";`;

        const getAssoCareer = `select getassociatedcareersbydni($1,'assoCareerCursor');`;
        const fetchAssoCareer = `FETCH ALL IN "assoCareerCursor";`;

        const getDirection = `select getdirectionbydni($1,'directionCursor');`;
        const fetchDirection = `FETCH ALL IN "directionCursor";`;

        const client: PoolClient = await pool.connect();
        try {
            const dni = [req.params.dni];
            await Queries.begin(client);
            const student = await Queries.simpleSelectWithParameterContinous(getStudent, dni, fetchStudent, client);
            const careers = await Queries.simpleSelectWithParameterContinous(getCarees, dni, fetchCarees, client);
            const networks = await Queries.simpleSelectWithParameterContinous(getNetworks, dni, fetchNetworks, client);
            const languages = await Queries.simpleSelectWithParameterContinous(getLanguages, dni, fetchLanguages, client);
            const associated_careers = await Queries.simpleSelectWithParameterContinous(getAssoCareer, dni, fetchAssoCareer, client);
            const direction = await Queries.simpleSelectWithParameterContinous(getDirection, dni, fetchDirection, client);
            await Queries.rollback(client);

            return res.status(200).json(
                {
                    'student': student.rows[0],
                    'careers': careers.rows,
                    'networks': networks.rows,
                    'languages': languages.rows,
                    'associated_careers': associated_careers.rows,
                    'direction': direction.rows[0]
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
     * Get specific student no matter status.
     * path: /student_all/:dni
     * method: get
     */
    async getStudentByDniAll(req: Request, res: Response): Promise<Response> {
        const getStudent = `select getstudentbydniall($1,'studentCursor');`;
        const fetchStudent = `FETCH ALL IN "studentCursor";`;

        const getCarees = `select getcareersbydni($1,'careersCursor');`;
        const fetchCarees = `FETCH ALL IN "careersCursor";`;

        const getNetworks = `select getnetworksbydni($1,'networksCursor');`;
        const fetchNetworks = `FETCH ALL IN "networksCursor";`;

        const getLanguages = `select getlanguagesbydni($1,'languagesCursor');`;
        const fetchLanguages = `FETCH ALL IN "languagesCursor";`;

        const getAssoCareer = `select getassociatedcareersbydni($1,'assoCareerCursor');`;
        const fetchAssoCareer = `FETCH ALL IN "assoCareerCursor";`;

        const getDirection = `select getdirectionbydni($1,'directionCursor');`;
        const fetchDirection = `FETCH ALL IN "directionCursor";`;

        const client: PoolClient = await pool.connect();
        try {
            const dni = [req.params.dni];

            await Queries.begin(client);
            const student = await Queries.simpleSelectWithParameterContinous(getStudent, dni, fetchStudent, client);
            const careers = await Queries.simpleSelectWithParameterContinous(getCarees, dni, fetchCarees, client);
            const networks = await Queries.simpleSelectWithParameterContinous(getNetworks, dni, fetchNetworks, client);
            const languages = await Queries.simpleSelectWithParameterContinous(getLanguages, dni, fetchLanguages, client);
            const associated_careers = await Queries.simpleSelectWithParameterContinous(getAssoCareer, dni, fetchAssoCareer, client);
            const direction = await Queries.simpleSelectWithParameterContinous(getDirection, dni, fetchDirection, client);
            await Queries.rollback(client);

            return res.status(200).json(
                {
                    'student': student.rows[0],
                    'careers': careers.rows,
                    'networks': networks.rows,
                    'languages': languages.rows,
                    'associated_careers': associated_careers.rows,
                    'direction': direction.rows[0]
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
     * Get all students basic information.
     * path: /student_basic/
     * method: get
    */
    async getStudentsBasic(req: Request, res: Response): Promise<Response> {
        const query = `select getstudentsbasic('studentsCursor');`;
        const fetch = `FETCH ALL IN "studentsCursor";`;
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
     * Create new student.
     * path: /student/
     * method: post
     */
    async createStudent(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const createPerson = `SELECT createperson($1,$2,$3,$4,$5,$6,$7,$8);`;
        const createStudent = `SELECT createstudent($1,$2,$3,$4,$5,$6,$7,$8);`;
        const createStudentXcareer = `SELECT createstudentxcareer($1,$2);`;
        const createStudentXlanguage = `SELECT createstudentxlanguage($1,$2);`;
        const createStudentXassociated_career = `SELECT createstudentxassociatedcareer($1,$2);`;
        const createStudentXnetworks = `SELECT createstudentxnetwork($1,$2);`;
        try {

            const personValues = [req.body.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates, req.body.phone_number, req.body.email,'Estudiante'];
            const studentValues = [req.body.dni, req.body.id_district, req.body.marital_status,
            req.body.campus_code, req.body.profile, req.body.address, req.body.nationality, req.body.emergency_contact];
            
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(createPerson, personValues, client);
            await Queries.simpleTransactionContinous(createStudent, studentValues, client);

            const careers: [] = req.body.careers;
            const languages: [] = req.body.languages;
            const networks: [] = req.body.networks;
            const associated_careers: [] = req.body.associated_careers;

            careers.map(async (c) => {
                await Queries.simpleTransactionContinous(createStudentXcareer, [personValues[0], c], client);
            });

            languages.map(async (l) => {
                await Queries.simpleTransactionContinous(createStudentXlanguage, [personValues[0], l], client);
            });

            networks.map(async (n) => {
                await Queries.simpleTransactionContinous(createStudentXnetworks, [personValues[0], n], client);
            });

            associated_careers.map(async (a) => {
                await Queries.simpleTransactionContinous(createStudentXassociated_career, [personValues[0], a], client);
            });

            await Queries.commit(client);

            return res.status(200).json(
                {
                    msg: 'Student created'
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
     * Insert CV to student.
     * path: /studentcv
     * method: post
     */

    async insertCV(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const insert = `SELECT insertCV($1,$2,$3);`;
        try {
            let url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.dni, url, req.file.filename];
            await Queries.simpleTransaction(insert, values, client);
            return res.status(200).json(
                {
                    msg: 'CV inserted'
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
     * Update CV to student.
     * path: /studentcv
     * method: put
     */

    async updateCV(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        // const deleteD = `SELECT deleteCV($1);`;
        // const insert = `SELECT insertCV($1,$2,$3);`;
        const update = `SELECT updateCV($1,$2,$3);`
        try {
            const p = req.body.path;
            let fullPath = path.join(__dirname + '../../..' + '/public/' + p);
            fs.unlinkSync(fullPath);
            //const valuesD = [req.body.dni];
            // await Queries.begin(client);
            // await Queries.simpleTransactionContinous(deleteD, valuesD, client);
            let url = `${req.body.tabla}/${req.file.filename}`;
            const values = [req.body.dni, url, req.file.filename];
            await Queries.simpleTransaction(update, values, client);
            // await Queries.simpleTransactionContinous(insert, values, client);
            // await Queries.commit(client);
            return res.status(200).json(
                {
                    msg: 'CV updated'
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
     * Delete CV from student.
     * path: /studentcv/:dni
     * method: delete
     */

    async deleteCV(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const deleteD = `SELECT deleteCV($1);`;
        const query = `select getcv($1,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        try {
            const dni = [req.params.dni];
            await Queries.begin(client);
            const response = await Queries.simpleSelectWithParameterContinous(query, dni, fetch, client);
            let message = "empty"
            let resultado = response.rows[0];
            if (resultado != undefined) {
                const p = resultado.file_path;
                let fullPath = path.join(__dirname + '../../..' + '/public/' + p);
                fs.unlinkSync(fullPath);
                await Queries.simpleTransaction(deleteD, dni, client);
                message = "CV deleted";
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
     * Get student cv.
     * path: /studentcv/:dni
     * method: get
     */
    async getStudentCV(req: Request, res: Response): Promise<Response> {
        const query = `select getcv($1,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.dni];
            const response = await Queries.simpleSelectWithParameter(query, dni, fetch, client);
            const rows = response.rows[0];
            if (rows === undefined) {
                return res.status(200).json({
                    msg: "empty"
                });
            }
            return res.status(200).json(rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update specific student.
     * path: /student/:dni
     * method: put
     */
    async updateStudent(req: Request, res: Response): Promise<Response> {
        const updateStudent = `SELECT updatestudent($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [
                req.params.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates,
                req.body.id_district, req.body.marital_status, req.body.campus_code,
                req.body.profile, req.body.address, req.body.nationality, req.body.phone_number, req.body.email, req.body.emergency_contact
            ];

            await Queries.simpleTransaction(updateStudent, values, client);

            return res.status(200).json(
                {
                    msg: 'Student updated'
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
     * Update careers for student.
     * path: /student/:dni/careers
     * method: put
     */
    async updateCareersForStudent(req: Request, res: Response): Promise<Response> {
        const createStudentXcareer = `SELECT createstudentxcareer($1,$2);`;
        const deleteStudentXcareer = `SELECT deletestudentxcareer($1, $2);`;
        const client: PoolClient = await pool.connect();
        try {
            const toDelete: any = req.body.toDelete;
            const toCreate: any = req.body.toCreate;
            const dni = req.params.dni;
            await Queries.begin(client);
            toDelete.map(async (d: number) => {
                await Queries.simpleTransactionContinous(deleteStudentXcareer, [dni, d], client);
            });
            toCreate.map(async (c: number) => {
                await Queries.simpleTransactionContinous(createStudentXcareer, [dni, c], client);
            });

            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Careers updated'
            });

        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update languages for student.
     * path: /student/:dni/languages
     * method: put
     */
    async updateLanguagesForStudent(req: Request, res: Response): Promise<Response> {
        const createStudentXlanguage = `SELECT createstudentxlanguage($1,$2);`;
        const deleteStudentXlanguage = `SELECT deletestudentxlanguage($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const toDelete: any = req.body.toDelete;
            const toCreate: any = req.body.toCreate;
            const dni = req.params.dni;
            await Queries.begin(client);
            toDelete.map(async (d: number) => {
                await Queries.simpleTransactionContinous(deleteStudentXlanguage, [dni, d], client);
            });
            toCreate.map(async (c: number) => {
                await Queries.simpleTransactionContinous(createStudentXlanguage, [dni, c], client);
            });

            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Langueges updated'
            });

        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update networks for student.
     * path: /student/:dni/networks
     * method: put
     */
    async updateNetworksForStudent(req: Request, res: Response): Promise<Response> {
        const createStudentXnetworks = `SELECT createstudentxnetwork($1,$2);`;
        const deleteStudentXnetwork = `SELECT deletestudentxnetwork($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const toDelete: any = req.body.toDelete;
            const toCreate: any = req.body.toCreate;
            const dni = req.params.dni;
            await Queries.begin(client);
            toDelete.map(async (d: number) => {
                await Queries.simpleTransactionContinous(deleteStudentXnetwork, [dni, d], client);
            });
            toCreate.map(async (c: number) => {
                await Queries.simpleTransactionContinous(createStudentXnetworks, [dni, c], client);
            });

            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Networks updated'
            });

        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Update associated_careers for student.
     * path: /student/:dni/associated_careers
     * method: put
     */
    async updateAssoCareersForStudent(req: Request, res: Response): Promise<Response> {
        const createStudentXassociated_career = `SELECT createstudentxassociatedcareer($1,$2);`;
        const deleteStudentXassoCareer = `SELECT deletestudentxassociatedcareer($1, $2);`;
        const client: PoolClient = await pool.connect();
        try {
            const toDelete: any = req.body.toDelete;
            const toCreate: any = req.body.toCreate;
            const dni = req.params.dni;
            await Queries.begin(client);
            toDelete.map(async (d: number) => {
                await Queries.simpleTransactionContinous(deleteStudentXassoCareer, [dni, d], client);
            });
            toCreate.map(async (c: number) => {
                await Queries.simpleTransactionContinous(createStudentXassociated_career, [dni, c], client);
            });

            await Queries.commit(client);

            return res.status(200).json({
                msg: 'Associated Careers updated'
            });

        } catch (error) {
            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get specific student status.
     * path: /student/:dni/status
     * method: get
     */
    async getStudentStatus(req: Request, res: Response): Promise<Response> {
        const query = `select getstudentstatus($1,'studentCursor');`;
        const fetch = `FETCH ALL IN "studentCursor";`;
        const client = await pool.connect();
        try {
            const dni = [req.params.dni];

            const response = await Queries.simpleSelectWithParameter(query, dni, fetch, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Disable specific student.
     * path: /student/:dni/disable
     * method: put
     */
    async disableStudent(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disablestudent($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni];

            await Queries.simpleTransaction(disable, values, client);

            return res.status(200).json({
                msg: 'Studend disable'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific student student.
     * path: /student/:dni/enable
     * method: put
     */
    async enableStudent(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enablestudent($1);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni];
            await Queries.simpleTransaction(enable, values, client);

            return res.status(200).json({
                msg: 'Studend enable'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Get student by specific profile
     * path: /student/profile/:profile
     * method: get
     */
    async getstudentbyprofile(req: Request, res: Response): Promise<Response> {
        const getStudent = `select getstudentbyprofile($1,'studentCursor');`;
        const fetchStudent = `FETCH ALL IN "studentCursor";`;

        const client = await pool.connect();
        try {
            const personValues = [req.params.profile];

            const response = await Queries.simpleSelectWithParameter(getStudent, personValues, fetchStudent, client);

            return res.status(200).json(response.rows);
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

const studentController = new StudentController();
export default studentController;