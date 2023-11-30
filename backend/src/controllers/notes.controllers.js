import successHandler from "../utils/successHandler.js";
import { Category, Note, User } from "../models/index.model.js";

const loadNotes = async (userId = null) => {
  try {
    const whereCondition = userId ? { userId: userId } : {};

    let allNotes = await Note.findAll({
      where: whereCondition,
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return allNotes;
  } catch (error) {
    console.error("Error fetching data from DataBase:", error);
    throw error;
  }
};

export const getNotes = async (req, res, next) => {
  const { userId } = req;
  try {
    const userNotes = await loadNotes(userId);

    successHandler(res, 200, userNotes);
  } catch (error) {
    next(error);
  }
};

export const postNote = async (req, res, next) => {
  let { title, description, categories } = req.body;
  let { userId } = req;
  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  try {
    const newNote = await Note.create({ title, description, userId });

    if (categories) {
      let categoryInstances = await Promise.all(
        categories.map(async (cat) => {
          let [category] = await Category.findOrCreate({
            where: { name: cat.name },
          });
          return category;
        })
      );

      await newNote.addCategories(categoryInstances);
    }

    successHandler(res, 200, newNote);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "La nota ya existe" });
    } else {
      next(error);
    }
  }
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const noteToDelete = await Note.findOne({
      were: {
        id,
        userId,
      },
    });

    if (!noteToDelete) {
      throw new Error("Nota no encontrada o usuario no autorizado");
    }

    await noteToDelete.destroy();

    successHandler(res, 200, { message: "Nota eliminada exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const patchNote = async (req, res, next) => {
  const { id } = req.params;
  const { archived } = req.body;
  const { userId } = req;

  try {
    const noteToUpdate = await Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!noteToUpdate) {
      throw new Error("Nota no encontrada o usuario no autorizado");
    }

    await noteToUpdate.update({ archived });

    successHandler(res, 200, { message: "Nota actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
};

// En tu archivo que maneja las rutas o controladores

export const putNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, categories, archived } = req.body;
  const { userId } = req;

  try {
    const noteToUpdate = await Note.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!noteToUpdate) {
      throw new Error("Nota no encontrada");
    }

    await noteToUpdate.update({ title, description, archived });

    if (categories) {
      const listCategory = categories.map(async (cat) => {
        const [category, created] = await Category.findOrCreate({
          where: { name: cat.name },
        });
        return category;
      });
      const categoryInstances = await Promise.all(listCategory);
      await noteToUpdate.setCategories(categoryInstances);
    }

    successHandler(res, 200, { message: "Nota actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
};
