import { User } from "../models/index.model.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import successHandler from "../utils/successHandler.js";

export const postLogin = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect || !user) {
      return res.status(401).json({ error: "Contraseña o usuario invalido." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      "APPnotasTEST2023",
      {
        expiresIn: 60 * 60 * 24 * 30,
      }
    );
    successHandler(res, 201, {
      username,
      name: user.name,
      token,
    });
  } catch (error) {
    next(error);
  }
};
