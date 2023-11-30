import { postLogin } from "../controllers/login.controllers.js";

import { Router } from "express";

const loginRouter = Router();
loginRouter.post("/", postLogin);

export default loginRouter;
