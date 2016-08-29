(function($) {
	// Let's start writing AJAX calls!

	var str = window.location.pathname.split("/");
	var len = str.length;
	var id = str[len - 1];
	console.log("id:" + str[len - 1]);

	$.fn.serializeFormJSON = function() {

		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [ o[this.name] ];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
	$(document).ready(function() {
		$('#profilev').click();
	});

	// console.log("URL:"+window.location.href);
	var userNewTaskForm = $("#updateprofile-form");

	var newUrl = "/My-Recipes/updateprofile";
	console.log("URL:"+newUrl);

	userNewTaskForm.submit(function(event) {
		event.preventDefault();
		console.log("inside update submit function .............. USER");
		var data = $(this).serializeFormJSON();

		var updateData = JSON.stringify({
				firstname : data.firstname,
				lastname : data.lastname,
				occupation : data.occupation,
				email : data.email,
				contact : data.contact,
				streetaddress : data.streetaddress,
				state : data.state,
				zipcode : data.zipcode

			
		});
		
		var requestConfig = {
			method : "PUT",
			url : newUrl,
			contentType : "application/json",
			data : updateData

		};

		$.ajax(requestConfig).then(function(responseMessage) {
			alert("User details saved successfully!!!!!!!!!! ");
		});
	});
	

	/* $(document).ready(function() {
		 //e.preventDefault();
	     $("#signout").click(function() {
	    	 //$.get("/My-Recipes/logout", function( data ) {
	    	    //}).then(function(r){
	         $.get("/My-Recipes/logout");
	        
	    	 //}); 
	     });
	     document.location = "/My-Recipes/index";
	 });*/
	  
	 
	
	
	$("#signout").click(function(e){
	    e.preventDefault();
	    $.ajax({ 
	        url: "/My-Recipes/logout",
	        cache: false
	    }).done(function(r){
	    	document.location = "/My-Recipes/index";
	    });
	});
	
	
	 
	 
		

})(window.jQuery);
/*
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



 var myNewTaskForm = $("#updateprofile-form");

 var uName = $("#uName").html();
 console.log("1 inside recipe script" + JSON.stringify(uName));

 //tabsId Id of the div containing the tab code.
 //srcId Id of the tab whose id you are looking for
 function id2Index(tabsId, srcId)
 {
 var index=-1;
 var i = 0, tbH = $(tabsId).find("li a");
 var lntb=tbH.length;
 if(lntb>0){
 for(i=0;i<lntb;i++){
 o=tbH[i];
 if(o.href.search(srcId)>0){
 index=i;
 }
 }
 }
 return index;
 }


 //   var data = $("#form :input").serialize();
 //  console.log("data:"+ data);


 myNewTaskForm.submit(function (event) {
 event.preventDefault();

 var data = $(this).serializeFormJSON();
 console.log("123:"+ JSON.stringify(data));
 console.log("2 inside submit");
 //  var data = $("#add-recipe-form").serializeArray();
 //var str = data.imgInp2.split("\\");
 //var len = str.length;
 //var imgUrl = str[len-1];
 //console.log("image_url:" + imgUrl);


 // var ingredients; // this is what you got.
 var i;
 var ingredientsList = [];
 for(i= 0; i<data.voca.length; i++)
 ingredientsList.push({name: data.voca[i], quantity: data.vocaquant[i] , ismain:data.vocamain[i]}); 

 console.log("ingredients[1]:"+ JSON.stringify(ingredientsList[0]));
 console.log("ingredients[2]:"+ JSON.stringify(ingredientsList[1]));

 console.log("3 inside submit");

 var requestConfig = {
 method: "PUT",
 url: "/users/updateprofile",
 contentType: 'application/json',
 data: JSON.stringify({
 firstName: data.firstname,
 lastname: data.lastname,
 occupation: data.occupation,
 email: data.email,
 contact: data.contact,
 streetaddress: data.streetaddress,
 state: data.state,
 zipcode: data.zipcode,


 })
 };

 $.ajax(requestConfig).then(function (responseMessage) {
 window.location.reload();
 alert(responseMessage.message);

 });
 });






 })(window.jQuery);}*/

/* function signout_click(){
 console.log("inside userdetails.click");
 //var uName = $("#uName").html();
 //var list = $("#recipeList");

 var requestConfig1 = {
 method: "POST",
 url: "/My-Recipes/logout"
 };

 $.ajax(requestConfig1).then(function (responseMessage) {
 console.log("inside updateprofile.success");
 //var response = responseMessage.myrecipelist;
 //list.empty();



 });
 }*/
 	    