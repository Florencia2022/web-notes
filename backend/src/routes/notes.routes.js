import { Router } from "express";
import {
  getNotes,
  postNote,
  deleteNote,
  patchNote,
  putNote,
} from "../controllers/notes.controllers.js";
import authenticateToken from "../utils/authenticateToken.js";

const noteRouter = Router();

noteRouter.get("/", authenticateToken, getNotes);
noteRouter.post("/", authenticateToken, postNote);
noteRouter.delete("/:id", authenticateToken, deleteNote);
noteRouter.patch("/:id", authenticateToken, patchNote);
noteRouter.put("/:id", authenticateToken, putNote);

export default noteRouter;
