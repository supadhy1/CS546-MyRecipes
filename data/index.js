const recipeRoutes = require("./recipes");
const userData = require("./users");

let constructorMethod = (app) => {
    app.use("/recipes", recipeRoutes);
    };

module.exports = {
    recipes: require("./recipes"), users: userData
  };