import { User, Note, Category } from "../models/index.model.js";
import successHandler from "../utils/successHandler.js";
import * as bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  const { username, name, password } = req.body;

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    successHandler(res, 201, {
      username: savedUser.username,
      name: savedUser.name,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Note,
        },
      ],
    });
    successHandler(res, 200, users);
  } catch (e) {
    next(e);
  }
};
