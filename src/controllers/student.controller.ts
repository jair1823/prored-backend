import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

/**
 * Get all enable students.
 * path: /student/
 * method: get
 */
export const getStudents = async (req: Request, res: Response): Promise<Response> => {
    const query = `select getstudents('studentsCursor');`;
    const fetch = `FETCH ALL IN "studentsCursor";`;
    const client = await pool.connect();
    try {

        await client.query('BEGIN');

        await client.query(query)
        const students: QueryResult = await client.query(fetch);

        await client.query('ROLLBACK');
        client.release();

        return res.json(students.rows);
    } catch (error) {
        console.log(error);
        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Get specific enable student.
 * path: /student/:dni
 * method: get
 */
export const getStudentByDni = async (req: Request, res: Response): Promise<Response> => {
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

    const client = await pool.connect();
    try {
        const dni = req.params.dni;
        await client.query('BEGIN');

        await client.query(getStudent, [dni]);
        const student: QueryResult = await client.query(fetchStudent);

        await client.query(getCarees, [dni]);
        const careers: QueryResult = await client.query(fetchCarees);

        await client.query(getNetworks, [dni]);
        const networks: QueryResult = await client.query(fetchNetworks);

        await client.query(getLanguages, [dni]);
        const languages: QueryResult = await client.query(fetchLanguages);

        await client.query(getAssoCareer, [dni]);
        const associated_careers: QueryResult = await client.query(fetchAssoCareer);

        await client.query(getDirection, [dni]);
        const direction: QueryResult = await client.query(fetchDirection);

        await client.query('ROLLBACK');
        client.release();

        return res.json(
            {
                'student': student.rows[0],
                'careers': careers.rows,
                'networks': networks.rows,
                'languages': languages.rows,
                'associated_careers': associated_careers.rows,
                'direction': direction.rows
            }


        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Create new student.
 * path: /student/
 * method: post
 */
export const createStudent = async (req: Request, res: Response): Promise<Response> => {
    const client = await pool.connect();
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
        await client.query('BEGIN');

        await client.query(createPerson, personValues);
        await client.query(createStudent, studentValues);

        await client.query('COMMIT');

        const careers: [] = req.body.careers;
        const languages: [] = req.body.languages;
        const networks: [] = req.body.networks;
        const associated_careers: [] = req.body.associated_careers;

        careers.map(async (c) => {
            await client.query(createStudentXcareer, [personValues[0], c]);
        });

        languages.map(async (l) => {
            await client.query(createStudentXlanguage, [personValues[0], l])
        });
        networks.map(async (n) => {
            await client.query(createStudentXnetworks, [personValues[0], n])
        });
        associated_careers.map(async (a) => {
            await client.query(createStudentXassociated_career, [personValues[0], a])
        });

        client.release();
        return res.json(
            {
                msg: 'Student created'
            }
        );
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Update specific student.
 * path: /student/:dni
 * method: put
 */
export const updateStudent = async (req: Request, res: Response): Promise<Response> => {
    const updateStudent = `SELECT updatestudent($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;
    const client = await pool.connect();
    try {
        const values = [
            req.params.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates,
            req.body.id_district, req.body.marital_status, req.body.campus_code,
            req.body.profile, req.body.address, req.body.nationality
        ];
        await client.query('BEGIN');
        await client.query(updateStudent, values);
        await client.query('COMMIT');

        client.release();

        return res.json(
            {
                msg: 'Student updated'
            }
        );
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Create student x career.
 * path: /student/:dni/career
 * method: post
 */
export const addCareer = async (req: Request, res: Response): Promise<Response> => {
    const createStudentXcareer = `SELECT createstudentxcareer($1,$2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.career_code];

        await client.query('BEGIN');
        await client.query(createStudentXcareer, values);
        await client.query('COMMIT');

        client.release();

        return res.status(500).json(
            {
                msg: 'Career added'
            }
        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Create student x language.
 * path: /student/:dni/language
 * method: post
 */
export const addLanguage = async (req: Request, res: Response): Promise<Response> => {
    const createStudentXlanguage = `SELECT createstudentxlanguage($1,$2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.id_language];

        await client.query('BEGIN');
        await client.query(createStudentXlanguage, values);
        await client.query('COMMIT');

        client.release();

        return res.status(500).json(
            {
                msg: 'Language added'
            }
        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Create student x network.
 * path: /student/:dni/network
 * method: post
 */
export const addNetwork = async (req: Request, res: Response): Promise<Response> => {
    const createStudentXnetworks = `SELECT createstudentxnetwork($1,$2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.id_network];

        await client.query('BEGIN');
        await client.query(createStudentXnetworks, values);
        await client.query('COMMIT');

        client.release();

        return res.status(500).json(
            {
                msg: 'Network added'
            }
        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }

}

/**
 * Create student x associated career.
 * path: /student/:dni/associated_career
 * method: post
 */
export const addAssociatedCareer = async (req: Request, res: Response): Promise<Response> => {
    const createStudentXassociated_career = `SELECT createstudentxassociatedcareer($1,$2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.id_associated_career];

        await client.query('BEGIN');
        await client.query(createStudentXassociated_career, values);
        await client.query('COMMIT');

        client.release();

        return res.status(500).json(
            {
                msg: 'Associated Career added'
            }
        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Delete student x career.
 * path: /student/:dni/career
 * method: delete
 */
export const removeCareer = async (req: Request, res: Response): Promise<Response> => {
    const deleteStudentXcareer = `SELECT deletestudentxcareer($1, $2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.career_code];

        await client.query('BEGIN');
        await client.query(deleteStudentXcareer, values);
        await client.query('COMMIT');

        client.release();
        return res.status(500).json(
            {
                msg: 'Career removed'
            }
        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Delete student x language.
 * path: /student/:dni/language
 * method: delete
 */
export const removeLanguage = async (req: Request, res: Response): Promise<Response> => {
    const deleteStudentXlanguage = `SELECT deletestudentxlanguage($1,$2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.id_language];

        await client.query('BEGIN');
        await client.query(deleteStudentXlanguage, values);
        await client.query('COMMIT');

        client.release();
        return res.status(500).json(
            {
                msg: 'Language removed'
            }
        );
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Delete student x network.
 * path: /student/:dni/network
 * method: delete
 */
export const removeNetwork = async (req: Request, res: Response): Promise<Response> => {
    const deleteStudentXnetwork = `SELECT deletestudentxnetwork($1,$2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.id_network];

        await client.query('BEGIN');
        await client.query(deleteStudentXnetwork, values);
        await client.query('COMMIT');

        client.release();
        return res.status(500).json({
            msg: 'Network removed'
        });
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Delete student x associated career.
 * path: /student/:dni/associated_career
 * method: delete
 */
export const removeAssociatedCareer = async (req: Request, res: Response): Promise<Response> => {
    const deleteStudentXassoCareer = `SELECT deletestudentxassociatedcareer($1, $2);`;
    const client = await pool.connect();
    try {
        const values = [req.params.dni, req.body.id_associated_career]

        await client.query('BEGIN');
        await client.query(deleteStudentXassoCareer, values);
        await client.query('COMMIT');

        client.release();
        return res.status(500).json({
            msg: 'Associated Career removed'
        });
    } catch (error) {

        await client.query('ROLLBACK');
        client.release();
        console.log(error);

        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Disable specific student.
 * path: /student/:dni/disable
 * method: put
 */
export const disableStudent = async (req: Request, res: Response): Promise<Response> => {
    const disable = `SELECT disablestudent($1);`;
    const client = await pool.connect();
    try {
        const personValues = [req.params.dni];
        await client.query('BEGIN');
        await client.query(disable, personValues);
        await client.query('COMMIT');
        client.release();
        return res.json({
            msg: 'Studend disable'
        });
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Enable specific student student.
 * path: /student/:dni/enable
 * method: put
 */
export const enableStudent = async (req: Request, res: Response): Promise<Response> => {
    const enable = `SELECT enablestudent($1);`;
    const client = await pool.connect();
    try {
        const personValues = [req.params.dni];
        await client.query('BEGIN');
        await client.query(enable, personValues);
        await client.query('COMMIT');
        client.release();
        return res.json({
            msg: 'Studend enable'
        });
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.send({
            msg: 'Internal Server Error'
        });
    }
}

/**
 * Get student by specific profile
 * path: /student/profile/:profile
 * method: get
 */
export const getstudentbyprofile = async (req: Request, res: Response): Promise<Response> => {
    const getStudent = `select getstudentbyprofile($1,'studentCursor');`;
    const fetchStudent = `FETCH ALL IN "studentCursor";`;

    const client = await pool.connect();
    try {
        const personValues = [req.params.profile];

        await client.query('BEGIN');
        await client.query(getStudent, personValues);
        const student: QueryResult = await client.query(fetchStudent);
        await client.query('ROLLBACK');

        client.release();

        return res.json(student.rows);
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.send({
            msg: 'Internal Server Error'
        });
    }
}