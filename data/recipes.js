const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');


let exportedMethods = {
    getAllRecipes() {
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({}).toArray();
        });
    },
    
    getRecipeById(id) {
		console.log("111");
		if(id === undefined){Reject("Recipe id required.") };
        console.log("222");
        return recipes().then((recipeCollection) => {
            console.log("333");
            return recipeCollection.findOne({ _id: id }).then((recipe) => {
				
                if (!recipe) throw "Recipe not found";
                return recipe;
            });
        });
    },
    
    getRecipesByUser(uname) {
        //console.log("123");
		console.log("uname:"+uname);
      return recipes().then((recipeCollection) => {
        //  console.log("456");
            return recipeCollection.find({ "username":uname }).toArray();/*.then((recipelist) => {
				console.log("123:"+recipelist);
                if (!recipelist) throw "Recipe not found";
                return recipelist.toArray();
            });*/
        });
    },

        getCuisine(){
        //console.log("123");
      console.log("I am inside data");
        //uname="swati";
   return recipes().then((recipeCollection) => {

    return recipeCollection.distinct("cuisine");
         
    });
       
    },




  getRecipeByName(name) {
        
        if(name === undefined){Reject("Recipe name required.") };
        console.log("Inside getrecipebyname"+name);

        return recipes().then((recipeCollection) => {
            return recipeCollection.findOne({ name: {$regex: name,$options:'/'+name+'/i'}}).then((recipe) => {
                //db.collection.find({ "category": /^\s+|\s+$/ },{ "category": 1 })
                if (!recipe) throw "Recipe not found";
                console.log(recipe);
                return recipe;
            //return recipeCollection.findOne({name: name},{"search.search-recipe":1});

            });
        });
    },


getRecipeByCuisine(cuisine) {
        
        if(cuisine === undefined){Reject("cuisine name required.") };
        console.log("Inside getrecipebycuisine " + cuisine);
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({ cuisine: {$regex: cuisine,$options:'/'+cuisine+'/i'}}).toArray();
              
            //return recipeCollection.findOne({name: name},{"search.search-recipe":1});

            });
       
    },

getRecipeByIngredient(ingredient) {
        
        if(ingredient === undefined){Reject("ingredient name required.") };
        console.log("Inside getrecipebyingredient");
        return recipes().then((recipeCollection) => {
            //return recipeCollection.find({ "ingredients.name": ingredient }).toArray();
            return recipeCollection.find({ "ingredients.name": {$regex: ingredient,$options:'/'+ingredient+'/i'}}).toArray();
               /*  console.log(recipe);
                if (!recipe) throw "Recipe not found";
               
                return recipe;*/
            //return recipeCollection.findOne({name: name},{"search.search-recipe":1});

            //});
        });
    },






getRecipeByMainIngredient(ingredient) {
        
        if(ingredient === undefined){Reject("ingredient name required.") };
        console.log("Inside getrecipebyingredient main");
        return recipes().then((recipeCollection) => {
            return recipeCollection.find({ "ingredients.name": {"ingredients.name":ingredient,"ingredients.ismain":"Yes" }}).toArray();
             //    console.log("helloooooooo"+ingredients.ismain);
             /*   if (!recipe) throw "Recipe not found";
               
                return recipe;*/
            //return recipeCollection.findOne({name: name},{"search.search-recipe":1});

            //});
        });
    },
    
    
	getCommentById(commentId){
		if(commentId === undefined){Reject("Comment id required.") };
		
		return recipes().then((recipeCollection) => {
            
			return recipeCollection.findOne({"comments._id":commentId},{ "title":1,"comments.$": 1 },{"comments._id":1,"comments.poster":1,"comments.comment":1,"_id":1}).then((newCommentInformation) => {
				
				return newCommentInformation;
				
				
			});	
			    
        });
		
	},
	
	
	
	getCommentsByRecipeId(recipeId){
		if(recipeId === undefined){Reject("Recipe id required.") };
		
		return recipes().then((recipeCollection) => {
            
			return recipeCollection.findOne({_id: recipeId},{"comments.email":1,"comments.poster":1,"comments.comment":1});
			    
        });
		
	},
	
	
addRecipe(recipe_name,username, description, image_url, prep_time, cook_time, servings, cuisine, ingredients, procedure) {
        return recipes().then((recipeCollection) => {
            
                let newRecipe = {
                        
                     _id: uuid.v4(),
                    name: recipe_name,
                    username:username,
                    description: description,
                    image_url: image_url,
                    prep_time: prep_time,
                    cook_time: cook_time,
                    servings: servings,
                    cuisine: cuisine,
                    ingredients: ingredients,
                    comments:[],
                    procedure: procedure
                          
                };

                    return recipeCollection.insertOne(newRecipe).then((newInsertInformation) => {
                        
                        return true;
                        
                    });
                    
        });
        
    },
    /*  addRecipe(recipe_name, description, image_url, prep_time, cook_time, servings, cuisine, ingredients, procedure){
            return myCollection.insertOne({_id: Guid.create().toString(), name: recipe_name, description: description, 
                image_url: image_url, prep_time: prep_time, cook_time: cook_time, servings: servings, cuisine: cuisine, ingredients: ingredients, procedure: procedure}).then(function(newRecipe){
                return true;
            });
        };*/
	
	addComment(id, poster,email,comment) {
         console.log("inside addcomment");
		if(id === undefined){Reject("Recipe id required.") };
			return recipes().then((recipeCollection) => {
            let newComment = {
                _id: uuid.v4(),
                poster: poster,
                email:email,
                comment: comment
                    
            };
          //  console.log("newCmt" + newComment);
        			
            return recipeCollection.update({ _id: id }, { $push: { "comments": newComment } }).then((newCommentInformation) =>  {
                
                return this.getCommentById(newComment._id);
            });			
		});
        
    },
	
	postComment(id,poster,comment) {
		if(id === undefined){Reject("Recipe id required.") };
		
		return recipes().then((recipeCollection) => {
            let newComment = {
                _id: uuid.v4(),
                poster: poster,
                comment: comment
                    
            };
        		
            return recipeCollection.updateOne({ _id: id }, { $push: { "comments": newComment } }).then((newCommentInformation) =>  {
                
                
				return newComment;
            });			
		});
        
    },
	
	updateComment(id,commentId, updatedComment) {
		if(id === undefined){Reject("Recipe id required.") };
		if(commentId === undefined){Reject("Comment id required.") };
		
		
        return recipes().then((recipeCollection) => {
            let updatedCommentData = {};
			
			updatedCommentData._id = commentId;

            if (updatedComment.poster) {
                updatedCommentData.poster = updatedComment.poster;
            } else {
				updatedCommentData.poster = null;
			}

            if (updatedComment.comment) {
                updatedCommentData.comment = updatedComment.comment;
            } else {
				updatedCommentData.comment = null;
			}
			
			
			
			return recipeCollection.update({ _id: id,"comments._id":commentId}, { "$set":{"comments.$":updatedCommentData}}).then((result) =>  {
				
                
                
				return updatedCommentData;
            });		
			
        });
    },
	
	removeComment(commentId) {
		if(commentId === undefined){Reject("Comment id Required.") };
        return recipes().then((recipeCollection) => {
						
            
			return recipeCollection.update({ },{ $pull: { comments: { _id:commentId } } },{ multi: true }).then((deletionInfo) => {	
			
  
			
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete comment with id of ${commentId}`)
                } else { }
            });
        });
    },
	
	

	
    removeRecipe(id) {
		if(id === undefined){Reject("Recipe id Required.") };
        return recipes().then((recipeCollection) => {
            return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete recipe with id of ${id}`)
                } else { }
            });
        });
    },
        updateRecipe(id, updatedRecipe) {
       if(id === undefined){Reject("Recipe id Required.") };
        console.log("inside data updatedRecipe:"+ updatedRecipe);
        return recipes().then((recipeCollection) => {
            let updatedRecipeData = {};
            
            if (updatedRecipe.name) {
                updatedRecipeData.name = updatedRecipe.name;
            }
            
             if (updatedRecipe.cuisine) {
                  updatedRecipeData.cuisine = updatedRecipe.cuisine;
            }
            
             if (updatedRecipe.ctime) {
                updatedRecipeData.cook_time = updatedRecipe.ctime;
            }

            if (updatedRecipe.prep_time) {
                updatedRecipeData.prep_time = updatedRecipe.prep_time;
            }
            if (updatedRecipe.servings) {
                 updatedRecipeData.servings = updatedRecipe.servings;
            }
            
            if (updatedRecipe.description) {
                 updatedRecipeData.description = updatedRecipe.description;
            }

            if (updatedRecipe.ingredients) {
                updatedRecipeData.ingredients = updatedRecipe.ingredients;
            }
            
            if (updatedRecipe.procedure) {
                updatedRecipeData.procedure = updatedRecipe.procedure;
            }
            
            if (updatedRecipe.image_url) {
                updatedRecipeData.image_url = updatedRecipe.image_url;
            }
            
            let updateCommand = {
                $set: updatedRecipeData
            };

            return recipeCollection.updateOne({ _id: id }, updateCommand).then((result) => {
                return this.getRecipeById(id);
            });
        });
    }
    
}

module.exports = exportedMethods;