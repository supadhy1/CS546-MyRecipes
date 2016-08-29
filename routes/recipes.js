const express = require('express');
const router = express.Router();
const data = require("../data");
const xss = require('xss');
const recipeData = data.recipes;

router.get("/:id", (req, res) => {
    let id = req.params.id;
         recipeData.getRecipeById(id).then((recipe) => {
       
        res.render("My-Recipes/recipe", {recipe: recipe
           });
       
    })
});

router.get("/", (req, res) => {
    recipeData.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.get("/myrecipes/:username", (req, res) => {
    console.log("1:myrecipes ->" + req.params.username);
    recipeData.getRecipesByUser(req.params.username).then((recipeList) => {
      //  console.log("after search" + recipeList);
       console.log("after search 2" + JSON.stringify(recipeList));
         res.json({myrecipelist:recipeList});
        // res.render("My-Recipes/userHome", {myrecipelist:recipeList});
    },() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});




router.get("/comments/:recipeId", (req, res) => {
    console.log("1");
recipeData.getCommentsByRecipeId(req.params.recipeId).then((commentList) => {
      //  console.log("2:"+JSON.stringify(commentList));
        res.json({commentList:commentList.comments});
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});


router.post("/comments/:recipeId", (req, res) => {
     let newRecipeData = req.body;
    recipeData.addComment(req.params.recipeId,newRecipeData.poster, newRecipeData.email,newRecipeData.comment)
        .then((newComment) => {
           // response.json({ success: true, message: xss(request.body.description) });
            res.json( { success: true, message: xss(newRecipeData.comment)});
            //response.json({ success: true, message: xss(request.body.poster) });
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.get("/recipes/cuisine", (req, res) => {
    console.log("cuisine");
recipeData.getCuisine.then((commentList) => {
      //  console.log("2:"+JSON.stringify(commentList));
        res.json({cuisine});
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/gotit/:name", (req, res) => {
    
recipeData.getRecipeByName(req.params.name).then((recList) => {
      //  console.log("2:"+JSON.stringify(commentList));
        res.json({recList:recList});
       
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/findit/:cuisine", (req, res) => {
   
recipeData.getRecipeByCuisine(req.params.cuisine).then((recList) => {
      //  console.log("2:"+JSON.stringify(commentList));
        res.json({recList:recList});
        //console.log(recList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/inside/:main_ing", (req, res) => {
    
recipeData.getRecipeByMainIng(req.params.main_ing).then((recList) => {
      //  console.log("2:"+JSON.stringify(commentList));
        res.json({recList:recList});
        //console.log(recList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/searchit/:ingredient", (req, res) => {
   
recipeData.getRecipeByIngredient(req.params.ingredient).then((recList1) => {
      //  console.log("2:"+JSON.stringify(commentList));
      
        res.json({recList1:recList1});
        
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/main/:ingredient", (req, res) => {
    
recipeData.getRecipeByMainIngredient(req.params.ingredient).then((recList1) => {
      //  console.log("2:"+JSON.stringify(commentList));
      
        res.json({recList1:recList1});
       // console.log("Inside routes ingredients recList1");
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});


router.post("/putit/:ingredient", (req, res) => {

recipeData.getRecipeByIngredient(req.params.ingredient).then((recList) => {
      //  console.log("2:"+JSON.stringify(commentList));
     
        res.json({recList:recList});
        
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});



router.post("/addrecipe", (req, res) => { 
    console.log("inside addrecipe")
    let newRecipeData = req.body;
    console.log("1234");
       
   recipeData.addRecipe(newRecipeData.recipe_name,
                       newRecipeData.username,
                       newRecipeData.description,
                       newRecipeData.img_url,
                       newRecipeData.preptime,
                       newRecipeData.cooktime,
                       newRecipeData.serving,
                       newRecipeData.cuisine,
                       newRecipeData.ingredients,
                       newRecipeData.procedure,
                       newRecipeData.img_url)
        .then((newrecipe) => {
           // response.json({ success: true, message: xss(request.body.description) });
          // res.render("My-Recipes/userHome", { message: "Recipe added!!!"});
            res.json( { success: true, message: "Recipe added!!!"});
            //response.json({ success: true, message: xss(request.body.poster) });
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});






/*router.post("/", (req, res) => {
    let recipeInfo = req.body;
    
   if (!recipeInfo) {
        res.status(400).json({ error: "You must provide data to create a recipe" });
        return;
    }

    if (!recipeInfo.title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!recipeInfo.ingredients) {
        res.status(400).json({ error: "You must provide a ingredients" });
        return;
    }

    recipeData.addRecipe(recipeInfo.title, recipeInfo.ingredients, recipeInfo.steps)
        .then((newRecipe) => {
            res.json(newRecipe);
        }, () => {
            res.sendStatus(500);
        });
}); */



router.put("/:id", (req, res) => {
    let recipeInfo = req.body;
    
   /* if (!recipeInfo) {
        res.status(400).json({ error: "You must provide data to update a recipe" });
        return;
    }

    if (!recipeInfo.title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!recipeInfo.ingredients) {
        res.status(400).json({ error: "You must provide a ingredients" });
        return;
    }*/

    let getRecipe = recipeData.getRecipeById(req.params.id);
    getRecipe.then(() => {
        return this.updateRecipe(req.params.id, recipeInfo)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });

});

router.delete("/:id", (req, res) => {
    let recipe = recipeData.getRecipeById(req.params.id).then(() => {
        return recipeData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;