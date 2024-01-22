import { Request, Response, NextFunction } from "express";
import { connection } from "./db";

const query = (sql: string, args: any) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err: any, rows: any) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const LoginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            res.send({ message: "Missing required fields" });
        }
        const results = (await query(
            "SELECT username, email, id, password from auth_users WHERE email = ?",
            email,
        )) as {
            username: string;
            email: string;
            id: number;
            password?: string;
        }[];
        if (results.length === 0) {
            res.status(400);
            res.send({ message: "User not found" });
            return;
        }
        const user = results[0];
        if (user.password !== password) {
            res.status(400);
            res.send({ message: "Incorrect email/password" });
            return;
        }
        delete user.password;
        res.send({ user, message: "Logged in" });
    } catch (err) {
        next(err);
    }
};

const RegisterController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            res.status(400);
            res.send({ message: "Missing required fields" });
        }
        const user = {
            username,
            password,
            email,
        };
        await query("INSERT INTO auth_users SET ?", user);
        const results = (await query(
            "SELECT username, email, id from auth_users WHERE username = ?",
            username,
        )) as { username: string; email: string; id: number }[];
        res.send(results[0]);
    } catch (err) {
        next(err);
    }
};

const DeleteController = (req: Request, res: Response) => {
    res.send({ message: "Delete" });
};

const PasswordController = (req: Request, res: Response) => {
    res.send({ message: "Password" });
};

const EmailController = (req: Request, res: Response) => {
    res.send({ message: "Email" });
};

module.exports = {
    LoginController,
    RegisterController,
    DeleteController,
    PasswordController,
    EmailController,
};
