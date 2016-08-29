const express = require('express');
const router = express.Router();


//const express = require('express');
//const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;


router.get("/index", (req, res) => {
  
 recipeData.getAllRecipes().then((recipeList) => {
        //console.log("3");
        res.render("My-Recipes/index", {recipelist : recipeList });
        //partial: "jquery-dom-scripts"
    })
});




router.get("/recipe/:id", (req, res) => {
          let id = req.params.id;
         recipeData.getRecipeById(id).then((recipe) => {
       
        res.render("My-Recipes/recipe", {recipe: recipe
           });
       
    })
}); 

router.get("/myrecipes/:id", (req, res) => {
          let id = req.params.id;
          console.log("id:"+id);
         recipeData.getRecipeById(id).then((recipe) => {
       
        res.render("My-Recipes/myrecipe", {recipe: recipe
           });
       
    })
}); 

router.get("/updateRecipe/:id", (req, res) => {
    console.log("inside update recipe");
     let id = req.params.id;
      console.log("id:"+id);
           recipeData.getRecipeById(req.params.id).then((recipe) => {
       console.log("recipe:"+ JSON.stringify(recipe));
        res.render("My-Recipes/updateRecipe", {recipe: recipe });
       
    });
});

router.put("/updateRecipe/:id", function(req, res){
  console.log("within updaterecipe post");
  let updatedData = req.body; 
    console.log("updatedData:"+ updatedData);   
     console.log("updatedData2:"+ JSON.stringify(updatedData));   
  
  
   recipeData.updateRecipe(req.params.id,updatedData ).then(function(updated_recipe){ 
    console.log("updated_recipe:"+ JSON.stringify(updated_recipe));
        // res.render("My-Recipes/userHome", {});
        res.json({updaterecipe:updated_recipe});
    });
  
});


router.get("/userHome", (req, res) => {
  res.render("My-Recipes/userHome", { });

});


router.get("/browse", (req, res) => {

console.log("I am where I have to be");
recipeData.getCuisine().then((cuisineResult) => {
  
 
   console.log("hello am "+cuisineResult); 
  
  res.render("My-Recipes/browse", {cuisineResult:cuisineResult});
 

});
});
module.exports = router;