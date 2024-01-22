import { Request, Response } from "express";

const LoginController = (req: Request, res: Response) => {
    res.send({ message: "Login" });
};

const RegisterController = (req: Request, res: Response) => {
    res.send({ message: "Register" });
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
