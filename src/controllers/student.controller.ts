import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

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

            const student = await Queries.simpleSelectWithParameterContinous(getStudent, dni, fetchStudent, client);
            const careers = await Queries.simpleSelectWithParameterContinous(getCarees, dni, fetchCarees, client);
            const networks = await Queries.simpleSelectWithParameterContinous(getNetworks, dni, fetchNetworks, client);
            const languages = await Queries.simpleSelectWithParameterContinous(getLanguages, dni, fetchLanguages, client);
            const associated_careers = await Queries.simpleSelectWithParameterContinous(getAssoCareer, dni, fetchAssoCareer, client);
            const direction = await Queries.simpleSelectWithParameter(getDirection, dni, fetchDirection, client);
            // await client.query('BEGIN');

            // await client.query(getStudent, [dni]);
            // const student: QueryResult = await client.query(fetchStudent);

            // await client.query(getCarees, [dni]);
            // const careers: QueryResult = await client.query(fetchCarees);

            // await client.query(getNetworks, [dni]);
            // const networks: QueryResult = await client.query(fetchNetworks);

            // await client.query(getLanguages, [dni]);
            // const languages: QueryResult = await client.query(fetchLanguages);

            // await client.query(getAssoCareer, [dni]);
            // const associated_careers: QueryResult = await client.query(fetchAssoCareer);

            // await client.query(getDirection, [dni]);
            // const direction: QueryResult = await client.query(fetchDirection);

            // await client.query('ROLLBACK');
            // client.release();

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

            const student = await Queries.simpleSelectWithParameterContinous(getStudent, dni, fetchStudent, client);
            const careers = await Queries.simpleSelectWithParameterContinous(getCarees, dni, fetchCarees, client);
            const networks = await Queries.simpleSelectWithParameterContinous(getNetworks, dni, fetchNetworks, client);
            const languages = await Queries.simpleSelectWithParameterContinous(getLanguages, dni, fetchLanguages, client);
            const associated_careers = await Queries.simpleSelectWithParameterContinous(getAssoCareer, dni, fetchAssoCareer, client);
            const direction = await Queries.simpleSelectWithParameter(getDirection, dni, fetchDirection, client);
            // await client.query('BEGIN');

            // await client.query(getStudent, [dni]);
            // const student: QueryResult = await client.query(fetchStudent);

            // await client.query(getCarees, [dni]);
            // const careers: QueryResult = await client.query(fetchCarees);

            // await client.query(getNetworks, [dni]);
            // const networks: QueryResult = await client.query(fetchNetworks);

            // await client.query(getLanguages, [dni]);
            // const languages: QueryResult = await client.query(fetchLanguages);

            // await client.query(getAssoCareer, [dni]);
            // const associated_careers: QueryResult = await client.query(fetchAssoCareer);

            // await client.query(getDirection, [dni]);
            // const direction: QueryResult = await client.query(fetchDirection);

            // await client.query('ROLLBACK');
            // client.release();

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
     * Create new student.
     * path: /student/
     * method: post
     */
    async createStudent(req: Request, res: Response): Promise<Response> {
        const client: PoolClient = await pool.connect();
        const createPerson = `SELECT createperson($1,$2,$3,$4,$5);`;
        const createStudent = `SELECT createstudent($1,$2,$3,$4,$5,$6,$7);`;
        const createStudentXcareer = `SELECT createstudentxcareer($1,$2);`;
        const createStudentXlanguage = `SELECT createstudentxlanguage($1,$2);`;
        const createStudentXassociated_career = `SELECT createstudentxassociatedcareer($1,$2);`;
        const createStudentXnetworks = `SELECT createstudentxnetwork($1,$2);`;
        try {

            const personValues = [req.body.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates];
            const studentValues = [req.body.dni, req.body.id_district, req.body.marital_status,
            req.body.campus_code, req.body.profile, req.body.address, req.body.nationality
            ];

            await Queries.simpleTransactionContinous(createPerson, personValues, client);
            await Queries.simpleTransactionContinous(createStudent, studentValues, client);

            // await client.query('BEGIN');

            // await client.query(createPerson, personValues);
            // await client.query(createStudent, studentValues);

            // await client.query('COMMIT');

            const careers: [] = req.body.careers;
            const languages: [] = req.body.languages;
            const networks: [] = req.body.networks;
            const associated_careers: [] = req.body.associated_careers;

            careers.map(async (c) => {
                await Queries.simpleTransactionContinous(createStudentXcareer, [personValues[0], c], client);
                // await client.query(createStudentXcareer, [personValues[0], c]);
            });

            languages.map(async (l) => {
                await Queries.simpleTransactionContinous(createStudentXlanguage, [personValues[0], l], client);
                //await client.query(createStudentXlanguage, [personValues[0], l])
            });
            networks.map(async (n) => {
                await Queries.simpleTransactionContinous(createStudentXnetworks, [personValues[0], n], client);
                //await client.query(createStudentXnetworks, [personValues[0], n])
            });
            associated_careers.map(async (a) => {
                await Queries.simpleTransaction(createStudentXassociated_career, [personValues[0], a], client);
                //await client.query(createStudentXassociated_career, [personValues[0], a])
            });

            //client.release();
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
     * Update specific student.
     * path: /student/:dni
     * method: put
     */
    async updateStudent(req: Request, res: Response): Promise<Response> {
        const updateStudent = `SELECT updatestudent($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [
                req.params.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates,
                req.body.id_district, req.body.marital_status, req.body.campus_code,
                req.body.profile, req.body.address, req.body.nationality
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
     * Create student x career.
     * path: /student/:dni/career
     * method: post
     */
    async addCareer(req: Request, res: Response): Promise<Response> {
        const createStudentXcareer = `SELECT createstudentxcareer($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.params.dni, req.body.career_code];

            await Queries.simpleTransaction(createStudentXcareer, values, client);

            return res.status(200).json(
                {
                    msg: 'Career added'
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
     * Create student x language.
     * path: /student/:dni/language
     * method: post
     */
    async addLanguage(req: Request, res: Response): Promise<Response> {
        const createStudentXlanguage = `SELECT createstudentxlanguage($1,$2);`;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.params.dni, req.body.id_language];

            await Queries.simpleTransaction(createStudentXlanguage, values, client);

            return res.status(200).json(
                {
                    msg: 'Language added'
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
     * Create student x network.
     * path: /student/:dni/network
     * method: post
     */
    async addNetwork(req: Request, res: Response): Promise<Response> {
        const createStudentXnetworks = `SELECT createstudentxnetwork($1,$2);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni, req.body.id_network];
            await Queries.simpleTransaction(createStudentXnetworks, values, client);

            return res.status(200).json(
                {
                    msg: 'Network added'
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
     * Create student x associated career.
     * path: /student/:dni/associated_career
     * method: post
     */
    async addAssociatedCareer(req: Request, res: Response): Promise<Response> {
        const createStudentXassociated_career = `SELECT createstudentxassociatedcareer($1,$2);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni, req.body.id_associated_career];
            await Queries.simpleTransaction(createStudentXassociated_career, values, client);

            return res.status(200).json(
                {
                    msg: 'Associated Career added'
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
     * Delete student x career.
     * path: /student/:dni/career
     * method: delete
     */
    async removeCareer(req: Request, res: Response): Promise<Response> {
        const deleteStudentXcareer = `SELECT deletestudentxcareer($1, $2);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni, req.body.career_code];
            await Queries.simpleTransaction(deleteStudentXcareer, values, client);

            return res.status(200).json(
                {
                    msg: 'Career removed'
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
     * Delete student x language.
     * path: /student/:dni/language
     * method: delete
     */
    async removeLanguage(req: Request, res: Response): Promise<Response> {
        const deleteStudentXlanguage = `SELECT deletestudentxlanguage($1,$2);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni, req.body.id_language];
            await Queries.simpleTransaction(deleteStudentXlanguage, values, client);

            return res.status(200).json(
                {
                    msg: 'Language removed'
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
     * Delete student x network.
     * path: /student/:dni/network
     * method: delete
     */
    async removeNetwork(req: Request, res: Response): Promise<Response> {
        const deleteStudentXnetwork = `SELECT deletestudentxnetwork($1,$2);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni, req.body.id_network];
            await Queries.simpleTransaction(deleteStudentXnetwork, values, client);

            return res.status(200).json({
                msg: 'Network removed'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Delete student x associated career.
     * path: /student/:dni/associated_career
     * method: delete
     */
    async removeAssociatedCareer(req: Request, res: Response): Promise<Response> {
        const deleteStudentXassoCareer = `SELECT deletestudentxassociatedcareer($1, $2);`;
        const client = await pool.connect();
        try {
            const values = [req.params.dni, req.body.id_associated_career]
            await Queries.simpleTransaction(deleteStudentXassoCareer, values, client);

            return res.status(200).json({
                msg: 'Associated Career removed'
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
            return res.json(response.rows[0]);
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

            return res.json({
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

            return res.json({
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

            return res.json(response.rows);
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