import { Router, Request, Response } from "express";
const {
    LoginController,
    RegisterController,
    DeleteController,
    PasswordController,
    EmailController,
} = require("./controllers");

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send({ message: "Router" });
});

router.post("/login", LoginController);

router.post("/register", RegisterController);

router.delete("/delete/:id", DeleteController);

router.patch("/password/:id", PasswordController);

router.patch("/email/:id", EmailController);

module.exports = router;
