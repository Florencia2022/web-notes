import successHandler from "../utils/successHandler.js";
import { Category, Note } from "../models/index.model.js";

const loadCategories = async () => {
  try {
    let allCategories = await Category.findAll({
      include: {
        model: Note,
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    });
    return allCategories;
  } catch (error) {
    console.error("Error fetching data from DataBase:", error);
    throw error;
  }
};

const loadCategoryByPk = async (id) => {
  try {
    let allNotesCategory = await Category.findByPk(id, {
      include: {
        model: Note,
        attributes: ["title", "description", "archived"],
        through: {
          attributes: [],
        },
      },
    });
    return allNotesCategory;
  } catch (error) {
    console.error("Error fetching data from DataBase:", error);
    throw error;
  }
};

export const getCategoryById = async (_, res, next) => {
  try {
    let allNotesCategory = await loadCategoryByPk();
    successHandler(res, 200, allNotesCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (_, res, next) => {
  try {
    let allCategories = await loadCategories();
    successHandler(res, 200, allCategories);
  } catch (error) {
    next(error);
  }
};

export const postCategories = async (req, res, next) => {
  let { categories } = req.body;

  try {
    let listCategory = categories.map(async (cat) => {
      let [category, created] = await Category.findOrCreate({
        where: { name: cat.name },
      });
      return category;
    });
    let categoryInstances = await Promise.all(listCategory);

    successHandler(res, 200, categoryInstances);
  } catch (error) {
    next(error);
  }
};
