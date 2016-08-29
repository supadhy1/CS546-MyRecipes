(function ($) {
    // Let's start writing AJAX calls!
     
    var str = window.location.pathname.split("/");
     var len = str.length;
     var id = str[len-1];
      console.log("id:" + str[len-1]);
      
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
     
     // console.log("URL:"+window.location.href);
      var myNewTaskForm = $("#update-recipe-form");
       
      var newUrl = "../updateRecipe/"+id;
      
    
    myNewTaskForm.submit(function (event) {
        event.preventDefault();
        var data = $(this).serializeFormJSON();
        
          var i;
        var ingredientsList = [];
       for(i= 0; i<data.voca.length; i++)
        ingredientsList.push({name: data.voca[i], min_q: data.vocaquant[i] , ismain:data.vocamain[i]}); 
        
       var updateData = JSON.stringify({
                name: data.rname,
                description:data.description,
                cuisine: data.cuisine,
                prep_time: data.ptime, 
                servings: data.servings,                
                ctime: data.ctime,
                ingredients:ingredientsList,
                procedure:data.procedure
                });
       
        
           var requestConfig = {
                method: "PUT",
                url: newUrl,
                contentType: "application/json",
                data:updateData
            
            };
           
           $.ajax(requestConfig).then(function (responseMessage) {
                 alert("Data Saved successfully!!!!!!!!!! ");
                  window.location.href = "http://localhost:3000/My-Recipes/myrecipes/"+responseMessage.updaterecipe._id;
            });
    });
            
  
    
})(window.jQuery);
