(function ($) {
    // Let's start writing AJAX calls!
     
      $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
     
     
     
     var myNewTaskForm = $("#add-recipe-form");
       
        var uName = $("#uName").html();
        console.log("1 inside recipe script" + uName);
      console.log("1 inside recipe script" + JSON.stringify(uName));
  
       myNewTaskForm.submit(function (event) {
        event.preventDefault();
        
         var data = $(this).serializeFormJSON();
      //  console.log("123:"+ JSON.stringify(data));
       //  var data = $("#add-recipe-form").serializeArray();
        var str = data.imgInp.split("\\");
         var len = str.length;
         var imgUrl = str[len-1];
         var imgExt = imgUrl.substring(imgUrl.indexOf("."));
        // console.log("Ext:"+ imgExt);
         var newImgUrl = data.rname+imgExt
       //  console.log("image_url:" + newImgUrl);
         
         
        // var ingredients; // this is what you got.
         var i;
        var ingredientsList = [];
       for(i= 0; i<data.voca.length; i++)
        ingredientsList.push({name: data.voca[i], min_q: data.vocaquant[i] , ismain:data.vocamain[i]}); 
        
         
          var requestConfig = {
                method: "POST",
                url: "/recipes/addrecipe",
                contentType: 'application/json',
                data: JSON.stringify({
                recipe_name: data.rname,
                username:uName,
                description:data.description,
                cuisine: data.cuisine,
                preptime: data.ptime, 
                serving: data.servings,                
                cooktime: data.ctime,
                ingredients:ingredientsList,
                procedure:data.procedure,
                img_url:newImgUrl
                    
                })
            };
            
            var formData = new FormData($(this)[0]);
            formData.append("img_name",newImgUrl );

      $.ajax({
        url: "/uploadimage",
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false
    });

            
           $.ajax(requestConfig).then(function (responseMessage) {
              window.location.reload();
               alert(responseMessage.message);
           
            });
            
           
            
            
        });
        
        
        
    
        
   
})(window.jQuery);

 function myrecipes_click(){
      console.log("inside myrecipes.click");
     var uName = $("#uName").html();
     var list = $("#recipeList");
         console.log("1 inside recipe script" +uName);
     var requestConfig1 = {
                method: "GET",
                url: "/recipes/myrecipes/"+uName,
                 error:function(response){
                    list.empty();
                     var errorHTML = [ "<h3><p>No Recipes found........</p><h3> " ];
                     list.append(errorHTML);
               }
              };
           
           $.ajax(requestConfig1).then(function (responseMessage) {
               console.log("inside myrecipes.success");
                var response = responseMessage.myrecipelist;
                console.log("len:"+response.length);
                list.empty();
                  if(response.length > 0){
                       response.forEach(function(item){
                   //   console.log("item:"+JSON.stringify(item));
                var recipeHTML = [
                    " <div class='row-fluid'>",

                "<div class='span12' >",

                  
                     " <ul>",

                       
                            "<div class='span4'>",
                                    "<a href='myrecipes/"+ item._id+"'>",
                                    "<img src='../public/images/recipe_images/"+item.image_url+"' class='img-polaroid' alt='Image'>",
                                    "</a>",
                                    "<h3><a href='myrecipes/"+item._id+"' >"+item.name+"</a></h3>",
                                    "<p>Description :"+ item.description,
                                    "</p> ",
                             "</div>",
                             
                             "</ul>",
                    
                            "<div>",
                                    
                        "</div>",
                ].join('\n');
                   list.append(recipeHTML);
                 });
                  
                  }
                  else {
                       var errorHTML = [ "<h3><p>No Recipes found........</p><h3> " ];
                     list.append(errorHTML);
                  }
               
             
            });
         
     }