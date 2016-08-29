const dbConnection = require("../config/mongoConnection");
const uuid = require('node-uuid');

   // console.log("ABC");
 var chickenTikkaProcedure = "Combine garlic, ginger, turmeric, garam masala, coriander, and cumin in a small bowl. Whisk yogurt, salt, and half of spice mixture in a medium bowl; add chicken and turn to coat. Cover and chill 4-6 hours. Cover and chill remaining spice mixture. \
	Heat ghee in a large heavy pot over medium heat. Add onion, tomato paste, cardamom, and chiles and cook, stirring often, until tomato paste has darkened and onion is soft, about 5 minutes. Add remaining half of spice mixture and cook, stirring often, until bottom of pot begins to brown, about 4 minutes. \
	Add tomatoes with juices, crushing them with your hands as you add them. Bring to a boil, reduce heat, and simmer, stirring often and scraping up browned bits from bottom of pot, until sauce thickens, 8-10 minutes. \
	Add cream and chopped cilantro. Simmer, stirring occasionally, until sauce thickens, 30-40 minutes. \
	Meanwhile, preheat broiler. Line a rimmed baking sheet with foil and set a wire rack inside sheet. Arrange chicken on rack in a single layer. Broil until chicken starts to blacken in spots (it will not be cooked through), about 10 minutes.\
	Cut chicken into bite-size pieces, add to sauce, and simmer, stirring occasionally, until chicken is cooked through, 8-10 minutes. Serve with rice and cilantro sprigs.";

var omletProcedure = "Whisk the eggs, milk, salt, and pepper in a medium bowl until pale yellow and the egg yolks and whites are evenly combined. Set a serving plate aside. \
Melt the butter in an 8-inch nonstick frying pan over medium heat until foaming. Add the egg mixture and stir constantly with a rubber spatula, moving the eggs around the pan until they form small curds, about 2 to 3 minutes. \
Gently shake the pan and use the spatula to spread the egg mixture evenly across the pan—the top of the eggs should have a creamy consistency. \
Sprinkle all over with the measured herbs. Remove the pan from heat. Using the spatula, fold a third of the omelet over and onto itself. \
Gently push the folded side of the omelet toward the edge of the pan. Tilt the pan over the serving plate and roll the omelet onto the plate, seam side down. \
Garnish with additional herbs and serve immediately.";

var salmonProcedure = "Cut salmon into 1/4-inch dice, then stir together with spinach, scallions, ginger, salt, and pepper in a large bowl until well combined. \
Beat together egg white and soy sauce in a small bowl and stir into salmon mixture, then form into 4 (1/2-inch-thick) patties. \
Heat a 12-inch nonstick skillet over moderate heat until hot and lightly brush with oil. Cook patties, carefully turning once, until golden brown and cooked through, 6 to 7 minutes total. \
Serve each burger topped with 1 1/2 teaspoons pickled ginger.";


	 dbConnection().then(db => {
     return db.collection("recipe").drop().then(function() {
                return db;
            }, ()=> {
                return db;
            });
           
        }).then((db) => {
            return db.createCollection("recipe");
        }).then((recipeCollection)=>{
        	var newDoc = function(name, username, description, image_url, prep_time, cook_time, servings, cuisine, procedure ){
				return {
        			_id: uuid.v4(),
        			name: name,
					username:username,
        			description: description,
        			image_url: image_url,
        			prep_time: prep_time,
        			cook_time: cook_time,
        			servings: servings,
        			cuisine: cuisine,
        			ingredients: [],
					comments:[],
        			procedure: procedure

        		}
				//console.log("2");
        	};

        	var ingredients = (recipe, name, min_q, ismain) =>{
              	var newIngredient = {
        			_id: uuid.v4(),
        			name: name,
        			min_q: min_q,
        			ismain: ismain
        		}
        		recipe.ingredients.push(newIngredient);
        	};

        	var listOfRecipes= [];

        	var chickenTikka = newDoc("Chicken Tikka Masala","swati", "Chicken Tikka Masala is a India Recipe.", "chicken-tikka.png", 5, 1, 6, "Indian", chickenTikkaProcedure);
        	ingredients(chickenTikka, "Boneless Chicken", "2 lbs", "Yes");
        	ingredients(chickenTikka, "Yoghurt", "1.3 ounces", "No");
        	ingredients(chickenTikka, "Limes", "2 teaspoons", "No");
        	ingredients(chickenTikka, "Garlic Clove", "1 clove","No");
        	ingredients(chickenTikka, "Coriander", "1 bunch", "No");
        	ingredients(chickenTikka, "Cardamom", "1.9 Ounces", "No");
        	ingredients(chickenTikka, "Ginger Root", "6 Ounces", "No");
        	ingredients(chickenTikka, "Yellow Onion", "1 Piece", "No");


        	var omlet = newDoc("Omlet","swati", "Omlet is a traditional breakfast item.", "omlet.png", 10, 10, 1, "American", omletProcedure);
        	ingredients(omlet, "Eggs", "1 dozen", "Yes");
        	ingredients(omlet, "Milk", "1 quart", "No");
        	ingredients(omlet, "Butter", "4 ounces", "No");
        	ingredients(omlet, "Parsley", "0.25 Oz","No");
        	ingredients(omlet, "cheese", "5 Oz", "No");
			
			
        	var salmonBurger= newDoc("Salmon Burger with Spinach and Ginger","abc", "Salmon Burger is a American breakfast delicacy.", "salmon-burger.jpg", 20, 40, 4, "American", salmonProcedure);
        	ingredients(salmonBurger, "Salmon Fillet", "8-10 ounces", "Yes");
        	ingredients(salmonBurger, "Spinach", "5 ounces", "No");
        	ingredients(salmonBurger, "Scallions", "5.5 ounces", "No");
        	ingredients(salmonBurger, "Ginger", "6 ounces", "No");
        	ingredients(salmonBurger, "Eggs", "1 dozen", "No");

        	listOfRecipes.push(chickenTikka, omlet, salmonBurger);

        	return recipeCollection.insertMany(listOfRecipes).then(() => {
				 return recipeCollection.find().toArray();
            });

        }).then(() => {
        console.log("Done seeding database");
        db.close();
    });

