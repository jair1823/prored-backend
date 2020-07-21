import { Request, Response } from 'express';
import crypto from 'crypto'
import { PoolClient } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import Queries from '../database/Queries';
import mail from '../lib/mailSender';

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
            let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
            const hash = bcrypt.hashSync(randPassword, 10);
            const values = [req.body.name, req.body.lastname1, req.body.lastname2, req.body.email, hash];
            await Queries.simpleTransaction(query, values, client);
            // const subject = 'Registro de usuario en Sistema ProRed'
            // const text = "";
            // const html = `
            //     <h2>¡Hola ${req.body.name} ${req.body.lastname1} ${req.body.lastname2}!</h2>
            //     <p>Se ha creado una cuenta para este correo en el Sistema de manejo de estudiantes de la ProRed</p>
            //     <p>Los datos para poder ingresar a su cuenta son los siguientes:</p>
            //     <br></br>
            //     <p><b>Correo: ${req.body.email}</b></p>
            //     <p><b>Contraseña Temporal: ${randPassword}</b></p>
            //     <br></br>
            //     <p>Para ingresar a su cuenta debe ir al siguiente link e ingresar los datos que se muestran en este correo.</p>
            //     Link: <a href="http://${process.env.DOMAIN}/iniciar-sesion"><b>http://${process.env.DOMAIN}/iniciar-sesion</b></a>
            //     <br></br>
            //     <p>Se recomienda que una vez que ingrese por primera vez a su cuenta cambie su contraseña por una más segura y definida por usted.</p>`;
            // await mail(req.body.email, subject, text, html);
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
            const decoded = req.body.decoded;
            await Queries.begin(client);
            let randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
            const hash = bcrypt.hashSync(randPassword, 10);
            const values = [decoded.id_user, hash];
            await Queries.simpleTransactionContinous(update, values, client);
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
     * Generate email with link and token to restore password
     * path: /forgotPassword
     * method: post
     */
    // async forgotPassword(req: Request, res: Response): Promise<Response> {
    //     const query1 = `select userEmailExists($1);`;
    //     const query2 = `select updateResetToken($1,$2,$3);`;
    //     const client: PoolClient = await pool.connect();
    //     try {
    //         let msg = "";
    //         const email = [req.body.email];
    //         const responseExist = await Queries.simpleSelectNoCursorContinous(query1, email, client);
    //         const exist = responseExist.rows[0].useremailexists;
    //         if (!exist) {
    //             msg = "Correo no existe"
    //             return res.status(200).json({ msg, emailSent: false });
    //         } else {
    //             const token = crypto.randomBytes(20).toString('hex');
    //             const expires = Date.now() + 3600000;
    //             const values = [req.body.email, token, expires];
    //             await Queries.simpleTransaction(query2, values, client);
    //             msg = 'sent';
    //             const subject = 'Cambio de contraseña'
    //             const text = "";
    //             const html = `
    //             <h3>¡Hola! Recibimos una solicitud para restablecer la contraseña de tu cuenta del Sistema ProRed</h3>
    //             <p>Para restablecer tu contraseña accede al siguiente link y sigue los pasos que se te indican. Este enlace expirará en 1 hora. </p>
    //             <br></br>
    //             Link: <a href="http://${process.env.DOMAIN}/reestablecer-contrasena/${token}"><b>http://${process.env.DOMAIN}/reestablecer-contrasena/${token}</b></a>
    //             <br></br>
    //             <p>Si no solicitaste este cambio de contraseña, ignora este correo y no se harán cambios en tu cuenta.</p>`;
    //             await mail(req.body.email, subject, text, html);
    //             return res.status(200).json({ msg, emailSent: true });
    //         }
    //     } catch (error) {
    //         await Queries.simpleError(client, error);
    //         return res.status(500).json("Internal Server Error");
    //     }
    // }

    /**
     * Validate the token to see if it is valid to restore password
     * path: /validatePasswordToken
     * method: post
     */
    // async validatePasswordToken(req: Request, res: Response): Promise<Response> {
    //     const query = `select validateToken($1, $2,'refTokens');`;
    //     const fetch = `FETCH ALL IN "refTokens";`;
    //     const client: PoolClient = await pool.connect();
    //     try {
    //         const values = [req.body.reset_password_token, Date.now()];
    //         const response = await Queries.simpleSelectWithParameter(query, values, fetch, client);
    //         return res.status(200).json(response.rows[0]);
    //     } catch (error) {
    //         await Queries.simpleError(client, error);
    //         return res.status(500).json("Internal Server Error");
    //     }
    // }

    /**
     * Reset password for a user who forgot it
     * path: /resetPassword
     * method: post
     */
    // async resetPassword(req: Request, res: Response): Promise<Response> {
    //     const query = `select updatePassword($1, $2);`;
    //     const client: PoolClient = await pool.connect();
    //     try {
    //         const hash = bcrypt.hashSync(req.body.password, 10);
    //         const values = [req.body.id_user, hash];
    //         await Queries.simpleTransaction(query, values, client);
    //         return res.status(200).json({
    //             msg: 'Password changed'
    //         });
    //     } catch (error) {
    //         await Queries.simpleError(client, error);
    //         return res.status(500).json("Internal Server Error");
    //     }
    // }

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
}

const userController = new UserController();
export default userController;