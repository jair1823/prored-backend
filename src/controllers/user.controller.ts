import { Request, Response } from 'express';
import crypto from 'crypto'
import { PoolClient } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class UserController {

    /**
     * Create a new user.
     * path: /user/
     * method: post
    */
    async createUser(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createuser($1,$2,$3,$4,$5);`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Usuario', 'Crear'];
            let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
            const hash = bcrypt.hashSync(randPassword, 10);
            const values = [req.body.name, req.body.lastname1, req.body.lastname2, req.body.email, hash];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(query, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                password: randPassword,
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Authenticate credentials for an email.
     * path: /user/authenticate
     * method: post
    */
    async authenticateUser(req: Request, res: Response): Promise<Response> {
        const query = `select getpassword($1,'passCursor');`;
        const fetch = `FETCH ALL IN "passCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const emailBody = [req.body.email]
            const pass = await Queries.simpleSelectWithParameter(query, emailBody, fetch, client);
            let response: any = { token: null };
            if (pass.rows[0] !== undefined) {
                if (bcrypt.compareSync(req.body.password, pass.rows[0].password)) {
                    // Passwords match
                    const token = jwt.sign({ id_user: pass.rows[0].id_user }, String(process.env.MASTER_PW), { expiresIn: '12h' });
                    response = { token: token }
                }
            }
            return res.status(200).json(response);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Update password for a given user.
     * path: /updatePassword
     * method: put
    */
    async updatePassword(req: Request, res: Response): Promise<Response> {
        const query = `select getpasswordid($1,'passCursor');`;
        const update = `select updatePassword($1, $2);`;
        const fetch = `FETCH ALL IN "passCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const decoded = req.body.decoded;
            await Queries.begin(client);
            const pass = await Queries.simpleSelectWithParameterContinous(query, [decoded.id_user], fetch, client);
            let response: any = { msg: "Error" };
            if (pass.rows[0] !== undefined) {
                if (bcrypt.compareSync(req.body.oldPassword, pass.rows[0].password)) {
                    // Passwords match
                    const hash = bcrypt.hashSync(req.body.newPassword, 10);
                    const values = [decoded.id_user, hash];
                    await Queries.simpleTransactionContinous(update, values, client);
                    response = { msg: "Password Updated" };
                }
            }
            await Queries.commit(client);
            return res.status(200).json(response);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /*
     * Restore password for a given user.
     * path: /restorePassword
     * method: put
    */
    async restorePassword(req: Request, res: Response): Promise<Response> {
        const query = `select getpasswordid($1,'passCursor');`;
        const update = `select updatePassword($1, $2);`;
        const fetch = `FETCH ALL IN "passCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Usuario', 'Reestablecimiento de Contraseña para usuario'];
            await Queries.begin(client);
            let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
            const hash = bcrypt.hashSync(randPassword, 10);
            const values = [req.body.id_user, hash];
            await Queries.simpleTransactionContinous(update, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);
            return res.status(200).json({
                password: randPassword,
            });
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Get all users that are active.
     * path: /user/
     * method: get
    */
    async getUsers(req: Request, res: Response): Promise<Response> {
        const query = `select getusers('userCursor'); `;
        const fetch = `FETCH ALL IN "userCursor";`;
        const client: PoolClient = await pool.connect();
        try {
            const response = await Queries.simpleSelect(query, fetch, client);
            return res.status(200).json(response.rows);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * See if a email already exists in the database
     * path: /user/email/exists
     * method: post
     */
    async checkUserEmailExists(req: Request, res: Response): Promise<Response> {
        const query = `select userEmailExists($1);`;
        const client: PoolClient = await pool.connect();
        try {
            const email = [req.body.email];
            const response = await Queries.simpleSelectNoCursor(query, email, client);
            return res.status(200).json(response.rows[0]);
        } catch (error) {
            await Queries.simpleError(client, error);
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Just validate if token is a valid one
     * path: /validateToken
     * method: get
     */
    async validateToken(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json("Valid Token");
        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }
    }

    /**
     * Disable specific user.
     * path: /user/:id/disable
     * method: put
     */
    async disableUser(req: Request, res: Response): Promise<Response> {
        const disable = `SELECT disableuser($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Usuario', 'Inactivar usuario'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(disable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: 'User disabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * Enable specific user.
     * path: /user/:id/enable
     * method: put
     */
    async enableUser(req: Request, res: Response): Promise<Response> {
        const enable = `SELECT enableuser($1);`;
        const client = await pool.connect();
        try {
            const log = [req.body.decoded.id_user, 'Usuario', 'Activar usuario'];
            const values = [req.params.id];
            await Queries.begin(client);
            await Queries.simpleTransactionContinous(enable, values, client);
            await Queries.insertLog(log,client);
            await Queries.commit(client);

            return res.status(200).json({
                msg: 'User enabled'
            });
        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

}

const userController = new UserController();
export default userController;