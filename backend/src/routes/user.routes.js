import { createUser, getUsers } from "../controllers/user.controllers.js";

import { Router } from "express";

const userRouter = Router();
userRouter.post("/", createUser);
userRouter.get("/", getUsers);

export default userRouter;
