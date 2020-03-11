import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';

export const getStudents = async (req: Request, res: Response): Promise<Response> => {
    try {
        const sql =
            `
        select 
            p.dni, p.name, p.lastname1, p.lastname2,
            p.born_dates, d.id_district ,d.name as district, 
            c.campus_code, c.name as campus,
            s.marital_status, s.profile, s.address, s.nationality
	
        from public.person p
        inner join public.student s on s.dni = p.dni
        inner join public.district d on d.id_district = s.id_district
        inner join public.campus c on c.campus_code = s.campus_code
        where p.status = true;
        `;
        const students: QueryResult = await pool.query(sql)
        return res.json(students.rows);
    } catch (error) {
        console.log(error);
        return res.send('Hello world, error');
    }
}

export const getStudentByDni = async (req: Request, res: Response): Promise<Response> => {
    const getSQL =
        `
        select 
            p.dni, p.name, p.lastname1, p.lastname2,
            p.born_dates, d.id_district ,d.name as district, 
            c.campus_code, c.name as campus,
            s.marital_status, s.profile, s.address, s.nationality
        from public.person p
        inner join public.student s on s.dni = p.dni
        inner join public.district d on d.id_district = s.id_district
        inner join public.campus c on c.campus_code = s.campus_code
        where p.status = true and p.dni = $1;
        `;
    const careersSQL = `
        select c.career_code, c.name, c.degree
            from public.career c
        inner join public.person_x_career pxc on c.career_code = pxc.career_code
        where dni = $1;
    `;
    const networkSQL = `
        select n.id_network, n.name, n.network_type
            from public.network n
        inner join public.person_x_network pxn on n.id_network = pxn.id_network
        where dni = $1;
    `;
    const languageSQL = `
        select l.id_language, l.name
            from public.language l
        inner join public.person_x_language pxl on l.id_language = pxl.id_language
        where dni = $1;
    `;
    const associated_careersSQL = `
        select ac.id_associated_career, ac.name as associated_career,
                c.id_center, c.name as center
            from public.associated_career ac
        inner join public.person_x_associated_career pxa on ac.id_associated_career = pxa.id_associated_career
        inner join public.center c on c.id_center = ac.id_center
        where dni = $1;
    `;
    try {
        const dni = req.params.dni;

        const student: QueryResult = await pool.query(getSQL, [dni]);
        const careers: QueryResult = await pool.query(careersSQL, [dni]);
        const networks: QueryResult = await pool.query(networkSQL, [dni]);
        const languages: QueryResult = await pool.query(languageSQL, [dni]);
        const associated_careers: QueryResult = await pool.query(associated_careersSQL, [dni]);
        return res.json(
            {
                'student': student.rows[0], 
                'careers': careers.rows,
                'networks': networks.rows,
                'languages': languages.rows,
                'associated_careers': associated_careers.rows
            }
                
            
        );
    } catch (error) {
        console.log(error);
        return res.send('Hello world, error');
    }
}

export const createStudent = async (req: Request, res: Response): Promise<Response> => {
    const client = await pool.connect();
    const person = `
        INSERT INTO public.person( dni, name, lastname1, lastname2, born_dates, status)
            VALUES ($1, $2, $3, $4, $5, true) RETURNING dni;
        `;
    const student = `
        INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING dni;
    `;
    const studentXcareer = `
        INSERT INTO public.person_x_career(dni, career_code)
            VALUES ($1, $2);
    `;
    const studentXlanguage = `
        INSERT INTO public.person_x_language(dni, id_language)
            VALUES ($1, $2);
    `;
    const studentXassociated_career = `
        INSERT INTO public.person_x_associated_career(dni, id_associated_career)
            VALUES ($1, $2);
    `;
    const studentXnetworks = `
        INSERT INTO public.person_x_network(dni, id_network)
            VALUES ($1, $2);
    `;
    try {

        const personValues = [req.body.dni, req.body.name, req.body.lastname1, req.body.lastname2, req.body.born_dates];
        const studentValues = [
            req.body.dni, req.body.id_district, req.body.marital_status,
            req.body.campus_code, req.body.profile, req.body.address, req.body.nationality
        ];
        await client.query('BEGIN');
        const result1: QueryResult = await client.query(person, personValues);
        const result2: QueryResult = await client.query(student, studentValues);
        await client.query('COMMIT');

        const careers: [] = req.body.careers;
        const languages: [] = req.body.languages;
        const networks: [] = req.body.networks;
        const associated_careers: [] = req.body.associated_careers;

        careers.map(async (c) => {
            await client.query(studentXcareer, [personValues[0], c]);
        });

        languages.map(async (l) => {
            await client.query(studentXlanguage, [personValues[0], l])
        });
        networks.map(async (n) => {
            await client.query(studentXnetworks, [personValues[0], n])
        });
        associated_careers.map(async (a) => {
            await client.query(studentXassociated_career, [personValues[0], a])
        });

        client.release();
        return res.json([result1.rows, result2.rows]);
    } catch (error) {
        console.log(error);
        await client.query('ROLLBACK');
        client.release();
        return res.send('Hello world, error');
    }
}