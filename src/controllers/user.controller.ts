import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/connection';
import Queries from '../database/Queries';

export class UserController {

    async CreateUser(req: Request, res: Response): Promise<Response> {
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

    async testUser(req: Request, res: Response): Promise<Response> {
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

}

const userController = new UserController();
export default userController;