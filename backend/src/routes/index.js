import { Router } from "express";
import categoryRouter from "./categories.routes.js";
import noteRouter from "./notes.routes.js";
import userRouter from "./user.routes.js";
import loginRouter from "./login.routes.js";

const router = Router();

router.use("/notes", noteRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/login", loginRouter);

export default router;
