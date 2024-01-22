require("dotenv").config();
import {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
    Errback,
} from "express";
const express = require("express");
const app = express();
const router = require("./routes");

const port = process.env.PORT || 3000;
const { connection } = require("./db");

connection.connect((err: any) => {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", (req: Request, res: Response) => {
    connection.query(
        "SELECT * from test_test",
        function (error: Error, results: any[], _fields: any[]) {
            if (error) {
                res.send({ message: "Could not connect to database" });
                throw error;
            }
            res.send(results[0]);
        },
    );
});

app.use("/auth", router);

class ExpressError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}
class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
app.use(function (req: Request, res: Response, next: NextFunction) {
    return next(new NotFoundError());
});

//Function Type:ErrorRequestHandler
app.use(function (
    err: ExpressError,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status },
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
