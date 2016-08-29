const exampleRoutes = require("./myrecipes");
const recipeRoutes = require("./recipes");
const userRoutes = require("./users");


const constructorMethod = (app) => {
    app.use("/My-Recipes", exampleRoutes);
    app.use("/recipes", recipeRoutes);
     app.use("/My-Recipes", userRoutes);
   

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;