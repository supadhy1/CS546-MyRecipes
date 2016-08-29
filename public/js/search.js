(function ($) {
      var myNewSearchForm = $("#form-wrapper");
      var myNewSearchForm1 = $("#form-wrapper1");
      var myNewSearchForm2 = $("#form-wrapper2");
      var myNewSearchForm5 = $("#form-wrapper5");
      
    
      var search_recipe = $("#search-recipe");
      var search_cuisine = $("#search-cuisine");
      var search_ingredient = $("#search-ingredient");
      var list = $("#recipe_List");
      var list2 = $("#related_List");
       var list3 =  $("#related_List_ing");               
      var newContent = $("#new-content");

       myNewSearchForm.submit(function (event){
          event.preventDefault();
          var newRecipe = search_recipe.val();
          var newUrl = "/recipes/gotit/"+newRecipe;
    
          if (newRecipe) {
                var requestConfig = {
                method: "POST",
                url: newUrl,
                contentType: 'application/json',
                error:function(response){
                    list.empty();
                     var errorHTML = [ "<h3><p>No Recipes found........</p><h3> " ];
                     list.append(errorHTML);
               },
                data: JSON.stringify({
                recipe: newRecipe                                  
                })
              };
                          
           $.ajax(requestConfig).then(function (responseMessage) {
              var response = responseMessage.recList;
              var ing = response.cuisine;
              var samerecipe = response.name;
              var text = "";
              list.empty(); 
              var itemHeading= [ "<div class='row-fluid'>",

                "<div class='span12'>",

                "<div id='divHeaderLine1'>Search results</div><br><br>",
                 "<div>",
                                    
                        "</div>",];
              list.append(itemHeading);          
              var itemHTML = [  "<a href=",
                         "recipe/"+response._id, 
                                      ">",
                                      "<img src='../public/images/recipe_images/"+response.image_url+"' class='img-polaroid' alt='Image'>",
                                      "</a>",
                                      "<h3><a href='recipe/"+response._id+"' >"+response.name+"</a></h3>",
                                      "<br>","<br>","<br>"].join('\n');                     
                   list.append(itemHTML);
                   var newUrl1 = "/recipes/findit/"+ing;
                
                var requestConfig1 = {
                method: "POST",
                url: newUrl1,
                contentType: 'application/json',
                data: JSON.stringify({
                recipe: ing                                 
                })
              };
              $.ajax(requestConfig1).then(function (responseMessage1) {
               var response1 = responseMessage1.recList;
               list3.empty();
                 var itemHeading= [ "<div class='row-fluid'>",

                "<div class='span12'>",

                "<div id='divHeaderLine1'>Related Recipes</div><br><br>",
                 "<div>",
                                    
                        "</div>",];
              list3.append(itemHeading);
             
              
              for(var i=0; i<response.ingredients.length ; i++)
                  { 
                    var prabha = (response.ingredients[i].ismain);
                    if(prabha == 'Yes')
                    {
                      var mobs = (response.ingredients[i].name) 
                    
                      var newUrl2 = "/recipes/searchit/"+mobs;
               var requestConfig2 = {
                method: "POST",
                url: newUrl2,
                contentType: 'application/json',
                error:function(response){
                    list.empty();
                     var errorHTML = [ "<h3><p>No Recipes found........</p><h3> " ];
                     list.append(errorHTML);
               },
                data: JSON.stringify({
                recipe: prabha                            
                })
              };

               $.ajax(requestConfig2).then(function (responseMessage2) {
                //list3.empty();
              var response2 = responseMessage2.recList1;
              var just = JSON.stringify(responseMessage2);
              var myname = (response2.ingredients);
              //list3.empty();
             
              response1.forEach(function(item1)
              {
               response2.forEach(function(item){
              
                
                  if(item1.name == item.name && item.name != samerecipe)
                  {
                   
                   var itemHTML2 = [ "<a href=",
                                      "recipe/"+item._id, 
                                      ">",
                                      "<img src='../public/images/recipe_images/"+item.image_url+"' class='img-polaroid' alt='Image'>",
                                      "</a>",
                                      "<h3><a href='recipe/"+item._id+"' >"+item.name+"</a></h3>",
                                      "<br>","<br>","<br>"].join('\n');                     
                   list3.append(itemHTML2); 
                  }
                }); 
             });
            }); 
                }
              }
                   
              });
            
            });
         }
        
    });



  myNewSearchForm1.submit(function (event) {
          event.preventDefault();
          var newCuisine = search_cuisine.val();
          var newUrl = "/recipes/findit/"+newCuisine;
      
          if (newCuisine) {
                var requestConfig = {
                method: "POST",
                url: newUrl,
                contentType: 'application/json',
                error:function(response){
                    list.empty();
                     var errorHTML = [ "<h3><p>No Recipes found........</p><h3> " ];
                     list.append(errorHTML);
               },
                data: JSON.stringify({
                recipe: newCuisine                                    //  testBool: true
                })
              };
              
           $.ajax(requestConfig).then(function (responseMessage) {
              var response = responseMessage.recList;
              list3.empty();
             list.empty();
             var itemHeading= [ "<div class='row-fluid'>",

                "<div class='span12'>",

                "<div id='divHeaderLine1'>Search results</div><br><br>",,
                 "<div>",
                                    
                        "</div>",];
              list.append(itemHeading);
              
              response.forEach(function(item){
                    
                     var itemHTML = [ 
                      
                     "<a href=",
                         "recipe/"+item._id, 
                                      ">",
                                      "<img src='../public/images/recipe_images/"+item.image_url+"' class='img-polaroid' alt='Image'>",
                                      "</a>",
                                      "<h3><a href='recipe/"+item._id+"' >"+item.name+"</a></h3>",
                                      "<br>","<br>","<br>"
                                      ].join('\n');                     
                   list.append(itemHTML);  
                   });
                });
        }
    });
            

 myNewSearchForm2.submit(function (event) {
          event.preventDefault();
          var newIngredient = search_ingredient.val();
          var newUrl = "/recipes/putit/"+newIngredient;
     
          if (newIngredient) {
                var requestConfig = {
                method: "POST",
                url: newUrl,
                contentType: 'application/json',
                error:function(response){
                    list.empty();
                     var errorHTML = [ "<h3><p>No Recipes found........</p><h3> " ];
                     list.append(errorHTML);
               },
                data: JSON.stringify({
                recipe: newIngredient                                    //  testBool: true
                })
              };

           
           $.ajax(requestConfig).then(function (responseMessage) {
              var response = responseMessage.recList;
              list3.empty();
              list.empty();
              var itemHeading= [ "<div class='row-fluid'>",

                "<div class='span12'>",

                "<div id='divHeaderLine1'>Search results</div><br><br>",
                 "<div>",
                                    
                        "</div>",];
              list.append(itemHeading);
              response.forEach(function(item){
                     var itemHTML = [ "<a href=",
                         "recipe/"+item._id, 
                                      ">",
                                      "<img src='../public/images/recipe_images/"+item.image_url+"' class='img-polaroid' alt='Image'>",
                                      "</a>",
                                      "<h3><a href='recipe/"+item._id+"' >"+item.name+"</a></h3>",
                                      "<br>","<br>","<br>"].join('\n');                     
                   list.append(itemHTML);
                   });               
            });
        }
    });

    var body = $("#pageBody");
        
    
    
})(window.jQuery);
