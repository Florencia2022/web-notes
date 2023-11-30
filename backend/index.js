import sequelize from "./src/db.js";
import Category from "./src/models/Category.model.js";
import Note from "./src/models/Note.model.js";
import User from "./src/models/User.model.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 3001;

const intermediateTable = { through: "notecategory", timestamps: false };

Category.belongsToMany(Note, intermediateTable);
Note.belongsToMany(Category, intermediateTable);
User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    console.log("Synchronize tables with database successfully");
    app.listen(PORT, () => {
      console.log(
        "\n<------------------------------ Iniciando Servidor ------------------------------>\n"
      );
      console.log(`100% - Listening at PORT:${PORT}`);
      console.log(
        "\n<-------------------------------------------------------------------------------->\n"
      );
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();
