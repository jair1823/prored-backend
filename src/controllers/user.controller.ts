import { Request, Response } from 'express';
import crypto from 'crypto'
import { PoolClient } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import Queries from '../database/Queries';
import mail from '../lib/mailSender';
export class UserController {

    async createUser(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createuser($1,$2,$3,$4,$5);`;
        const client: PoolClient = await pool.connect();
        try {
            const hash = bcrypt.hashSync(req.body.password, 10);
            const values = [req.body.name, req.body.lastname1, req.body.lastname2, req.body.email, hash];
            await Queries.simpleTransaction(query, values, client);
            return res.status(200).json({
                msg: "User Created",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("Internal Server Error");
        }
    }

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
                    const token = jwt.sign({ email: emailBody }, String(process.env.MASTER_PW), { expiresIn: '1800s' });
                    response = { token: token }
                }
            }
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.send({
                msg: "Internal Server Error",
            });
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

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * See if a email already exists in the database
     * path: /user/email/exists
     * method: get
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

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    /**
     * 
     */
    async forgotPassword(req: Request, res: Response): Promise<Response> {
        const query1 = `select userEmailExists($1);`;
        const query2 = `select updateResetToken($1,$2,$3);`;
        const client: PoolClient = await pool.connect();
        try {
            let msg = "";
            const email = [req.body.email];

            const responseExist = await Queries.simpleSelectNoCursorContinous(query1, email, client);
            const exist = responseExist.rows[0].useremailexists;
            console.log(exist)
            if (!exist) {
                msg = "Correo no existe"
                return res.status(200).json({ msg, emailSend: false });
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                const expires = Date.now() + 3600000;
                console.log(token);
                console.log(expires);
                console.log(Date.now());

                console.log(expires > Date.now());

                const values = [req.body.email, token, expires];
                await Queries.simpleTransaction(query2, values, client);

                msg = 'send';

                const subject = 'Restablecer contraseña'
                const text = "";
                const html = `
                <h3>Recibimos una solicitud de cambio de contraseña para tu cuenta del Sistema ProRed.</p>
                <p>Este enlace expirará en 1 hora. Si no solicitaste un cambio de contraseña, ignora este correo y no se harán cambios en tu cuenta.</p> 
                <h4>https://${process.env.DOMAIN}/restart-password/${token}</h4>`;
                await mail(req.body.email, subject, text, html);

                return res.status(200).json({ msg, emailSend: true });
            }


        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    async validatePasswordToken(req: Request, res: Response): Promise<Response> {
        const query = `select validateToken($1, $2,'refTokens');`;
        const fetch = `FETCH ALL IN "refTokens";`;
        const client: PoolClient = await pool.connect();
        try {

            const values = [req.body.reset_password_token, Date.now()];

            console.log(values)

            const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);

            return res.status(200).json(response.rows[0]);


        } catch (error) {

            await Queries.simpleError(client, error);

            return res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<Response> {
        const query = `select updatePassword($1, $2);`;
        const client: PoolClient = await pool.connect();
        try {

            const hash = bcrypt.hashSync(req.body.password, 10);
            const values = [req.body.id_user, hash];

            await Queries.simpleTransaction(query, values, client);

            return res.status(200).json({
                msg: 'Password changed'
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