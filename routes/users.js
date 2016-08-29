const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
const uuid = require('node-uuid');




router.get("/registration", (req, res) => {
	console.log("within get");
    res.render("My-Recipes/registration", {});
});



router.post("/registration", (req, res) => {
	console.log("inside post");	      
    let result;
	let userName = req.body.username;
	var hash = bcrypt.hashSync(req.body.pass);
	let firstName = req.body.firstname;
	let lastName = req.body.lastname;
	let occupation = req.body.occupation;
	let contact = req.body.contact;
	let streetaddress = req.body.streetaddress;
	let state = req.body.state;
	let zipcode = req.body.zipcode;
	let email = req.body.email;
	//var salt = bcrypt.genSaltSync();
	
	
	console.log("inside post2");	
	
    try {
		
        //bcrypt.hash(req.body.text2,10,function(err,hash) {
			 //if(err) throw err;
		userData.addUser(userName,hash,firstName,lastName,occupation,email,contact,streetaddress,state,zipcode).then((inserted_user) => {
			console.log("inserted_user",inserted_user);
            var expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1);		
            var generatedSessionID = uuid.v4();
		
            res.cookie("_currentSessionId", generatedSessionID, { expires: expiresAt });
			console.log("before inserting session id:",inserted_user._id);
		
		
			userData.insertSessionId(inserted_user._id,generatedSessionID).then((updated)=> {
		    
            });
		    result = inserted_user.username;
		    console.log ("result",result);
		
		
		res.redirect("/My-Recipes/login");
        });
		//});
		
		
    } catch (e) {
        res.render("My-Recipes/registration", { userName: userName,error: e });
        return;
    }
	
    
});

router.get("/profile", (req, res) => {
	console.log("within post profile");
	try {
	console.log("req.sessionID :",req.sessionID);	
	if(req.cookies._currentSessionId){
        console.log("Profile : Cookie Exists");
        userData.getUserFromSessionID(req.cookies._currentSessionId).then(function(obj){
            console.log("User by Session : " + JSON.stringify(obj));
            res.render("My-Recipes/profile", { userDetail: obj });
        //}, function(err){
            //response.render("profile/server", { pageTitle: "User Login and Profile system", _error: null });
        });
    }else{
        res.render("My-Recipes/profile", { error:" No session id" });
    }
    } catch(e) {
		res.render("My-Recipes/profile", { error: e });
	}
});

router.get("/auth", (req, res) => {
	console.log("within get login");
	res.render("My-Recipes/auth", {});
});


router.get("/login", (req, res) => {
	console.log("within get login");
	res.render("My-Recipes/login", {});
});

router.post("/login", (req, res) => {
	console.log("within post login");
	try {
		console.log("within post");
	    userData.getUser(req.body.username).then(function(user) {
            //console.log("pwd:",bcrypt.hashSync(req.body.pass));
			//console.log(user.size());
			if(!user || user===undefined) {
				res.render("My-Recipes/login", { error: "User doesn't exist!" });
				
			} else {
            bcrypt.compare(req.body.pass, user.encryptedPassword, function (err, response) {
				
            //if (response === true) {
                var expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 1);
                var generatedSessionID = uuid.v4();
                res.cookie("_currentSessionId", generatedSessionID, { expires: expiresAt });
                userData.insertSessionId(user._id,generatedSessionID).then(function(updated){
                });
				/*userData.getUserFromSessionID(req.cookies._currentSessionId ).then(function(user){
			    console.log("session11 id:",req.cookies._currentSessionId);
			    console.log("userin updateprofile",JSON.stringify(user));
			    console.log("user after global:",user);
			    
		        });	*/
				res.render("My-Recipes/userHome",{user:user})
                //res.redirect("/My-Recipes/userHome");
				console.log("before redirect to user home");
                
				
            //} else {
                //res.render("My-Recipes/auth", { error: "Passwords do not match!" });
            //}
			
            
            });
		
			}
			
        });

    } catch (e) {
		console.log(e);
        //response.status(500).json({ error: errorMessage });
        res.render("My-Recipes/login", { firstName: firstName,error: e });
    }
});	

/*router.get('/updateprofile', function(req, res){
	try {
		console.log("within get updateprofile");
		userData.getUserFromSessionID(req.cookies._currentSessionId ).then(function(user){
			console.log("session id:",req.cookies._currentSessionId);
			console.log("userin updateprofile",JSON.stringify(user));
			res.render("My-Recipes/userHome", {user:user});
			
		});	
	} catch (e) {
		res.render("My-Recipes/userHome", {error:e});
	}
	
});	*/


router.put('/updateprofile', function(req, res){
	console.log("within updateprofile put");
	try {
	let updatedData = req.body;	
    console.log("updatedData",updatedData);   
    /*    firstName: req.body.firstname;
        lastName: req.body.lastname;
        occupation: req.body.occupation;
		contact:req.body.contact;
    var address_to_update = {
        streetAddress: req.body.streetaddress,
        state: req.body.state,
        zipcode: req.body.zipcode
			
    };*/

    //userData.updateUser(req.cookies._currentSessionId,firstName,lastName,occupation,contact,address_to_update ).then(function(updated_user){
	userData.updateUser(req.cookies._currentSessionId,updatedData ).then(function(updated_user){	
		console.log("updated_use:",updated_user);
        res.render("My-Recipes/userHome", { user: updated_user,result:updated_user.username });
    });
	} catch (e) {
        //response.status(500).json({ error: errorMessage });
        res.render("My-Recipes/userHome", { firstName:updated_user.firstName,error: e });
    }
});
//For testing has to redirect to recipe home page......................................
router.get("/home", (req, res) => {
	//console.log(" within get profile");
	res.render("/My-Recipes/index");
});


router.get('/logout', function(req, res){
    console.log("now clearing the cookie");
    var expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() -50);
    res.cookie("currentSessionId", "", { expires: expiresAt });
    res.clearCookie("currentSessionId");
    //window.location.href = "/My-Recipes/index";
    res.redirect("/My-Recipes/index");
    /*userData.clearSessionID(req.cookies._currentSessionId).then((currentUser) => {
    	var anHourAgo = new Date();
        anHourAgo.setHours(anHourAgo.getHours() -1);

        // invalidate, then clear so that lastAccessed no longer shows up on the
        // cookie object
        res.cookie("_currentSessionId", "", { expires: anHourAgo });
        res.clearCookie("_currentSessionId");
        res.render("My-Recipes/index",{});
    });*/
    //var anHourAgo = new Date();
    //anHourAgo.setHours(anHourAgo.getHours() -1);

    // invalidate, then clear so that lastAccessed no longer shows up on the
    // cookie object
    //res.cookie("_currentSessionId", "", { expires: anHourAgo });
    //res.clearCookie("_currentSessionId");
    //req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        //res.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
     // });  
    //res.render("My-Recipes/index",{});
    //res.redirect("/");
});




module.exports = router;