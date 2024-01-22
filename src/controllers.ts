import { Request, Response } from "express";
import { connection } from "./db";

const query = (sql: string, args: any) => {
    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query(sql, args, (err: any, rows: any) => {
            if (err) reject(err);
            resolve(rows);
        });
        connection.end();
    });
};

const LoginController = (req: Request, res: Response) => {
    res.send({ message: "Login" });
};

const RegisterController = (req: Request, res: Response) => {
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
    connection.query("INSERT INTO auth_users SET ?", user, (err: any) => {
        if (err) throw err;
    });
    connection.query(
        "SELECT username, email, id from auth_users WHERE username = ?",
        username,
        (err: any, results: any) => {
            if (err) throw err;
            res.send(results[0]);
        },
    );
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
