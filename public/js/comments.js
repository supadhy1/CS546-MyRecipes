(function ($) {
    // Let's start writing AJAX calls!
     
     var str = window.location.pathname.split("/");
     var len = str.length;
     var id = str[len-1];
      console.log("id:" + str[len-1]);
     // console.log("URL:"+window.location.href);
      var myNewTaskForm = $("#comment-form"),
        newNameInput = $("#poster"),
        newEmailInput = $("#email"),
         newCommentInput = $("#comment");
    var newContent = $("#new-content");
 var newUrl = "/recipes/comments/"+id;
      
    
    myNewTaskForm.submit(function (event) {
        event.preventDefault();
          var newName = newNameInput.val();
         var newEmail = newEmailInput.val();
         var newCmt = newCommentInput.val();
        
        if (newName && newEmail) {
            var requestConfig = {
                method: "POST",
                url: newUrl,
                contentType: 'application/json',
                data: JSON.stringify({
                    poster: newName,
                    email: newEmail,
                    comment: newCmt                  //  testBool: true
                })
            };
           
           $.ajax(requestConfig).then(function (responseMessage) {
                newContent.html(responseMessage.message);
                 window.location.reload();
            
                              //alert("Data Saved:Comments ");
            });
        }
    });
   //-----------------------------------------------------------------------------------------
    var body = $("#pageBody");
    var list = $("#cmtList");
   // document.readyState
   var cmtUrl = "/recipes/comments/"+id
    $(document).ready(function (event) {
        console.log("a");
        console.log("url:"+cmtUrl);
         var requestConfig1 = {
                method: "GET",
                url: cmtUrl,
               contentType: 'application/json',
                 error: function() {
                 newContent.html('<p>An error has occurred</p>');
               }
              };
           
            $.ajax(requestConfig1).then(function (responseMessage) {
                 console.log("b:" + JSON.stringify(responseMessage.commentList));
                 var response = responseMessage.commentList;
               /*  for(var i=0; i< response.length ; i++){
                     console.log("i"+response[i].poster);
                 }*/
                response.forEach(function(item){
                      console.log(item.poster);;
            
                       var itemHTML = ["<li>",
                                "<div>",
                                     "<div>",
                                       item.comment,
                                       "By : "+ item.poster,
                                    "</div>",   
                                                                    
                                "</div>",
                            "</li>"].join('\n');
                   list.append(itemHTML);
                 });
                   //  list.html();
                });       
               
            });
            
        
    
    
})(window.jQuery);
