const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllUsers() {
        return users().then((userCollection) => {
            return userCollection.find({}).toArray();
        });
    },
	
	getUser (username){
        return users().then((userCollection) => {   
            return userCollection.find({ username: username }).limit(1).toArray().then((user)=> {
				console.log("user:",user);
                //if (user.length === 0) throw "Username not found!";
				//if (!user) throw "User not found";
				if (!user) return Promise.reject("No user found");
                return user[0];
            });
		});	
    },
	
	getUserFromSessionID(sessionID){
		console.log("sessionID:",sessionID);
		return users().then((userCollection) => {
		return userCollection.findOne({ currentSessionId: sessionID }).then(function(user) {
			    console.log("user in getUserFromSessionID:",user);
                if (user.length === 0) return Promise.reject("No user found");
                return user;
            });
			
		});	
		
	},
	
		
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getUserById(id) {
			
		//console.log("Within get user");
        return users().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((user) => {
				//console.log("Within get use:", user.username);
				
                if (!user) throw "User not found";
                return user;
            });
        });
    },
    addUser(_username, pass_hash,firstname,lastname,occupation,email,contact,streetaddress,state,zipcode) {
        return users().then((userCollection) => {
            let newUser = {
				_id: uuid.v4(),
                username: _username,
                encryptedPassword: pass_hash,
                currentSessionId: '',
				userStatus:"Active",
                
                firstName:firstname ,
                lastName: lastname,
                occupation: occupation,
				email:email,
			    contact:contact,
				
               
				address: {
					streetaddress:streetaddress,
					state:state,
					zipcode:zipcode
				}
				
                
            };

            return userCollection.insertOne(newUser).then((newInsertInformation) => {
				//console.log("newInsertInformation:",newInsertInformation);
                return newInsertInformation.insertedId;
            }).then((newId) => {
				//console.log (this.getUserById(newId));
                return this.getUserById(newId);
            });
        });
    },
	
	insertSessionId(id, sessionID){
		//console.log ();
		return users().then((userCollection) => {
		    return userCollection.updateOne({ _id: id }, { "$set": { "currentSessionId": sessionID } }).then(function() {
			console.log ("sessionID ",sessionID);
                return getUserById(id);
            });
		});
	},
	
    removeUser(id) {
        return users().then((userCollection) => {
            return userCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete user with id of ${id}`)
                }
            });
        });
    },
    /*updateUser(id, firstName, lastName) {
        return this.getUserById(id).then((currentUser) => {
            let updatedUser = {
                firstName: name,
                lastName: lastName
            };

            return userCollection.updateOne({ _id: id }, updatedUser).then(() => {
                return this.getUserById(id);
            });
        });
    },
	updateUser(sessionID, profile){
		console.log("within updateuser");
        return this.getUserFromSessionID(sessionID).then((currentUser) => {
			console.log("within updateuser1");
			return users().then((userCollection) => {
            return userCollection.updateOne({ currentSessionId: sessionID }, { "$set": { "profile": profile } }).then(() => {
				console.log("within updateuser2 sessionID",sessionID);
                return this.getUserFromSessionID(sessionID);
            });
			});
		});	
    },*/
	
	updateUser(sessionID, updatedData) {
		if(sessionID === undefined){Reject("User has to login.") };
		console.log("updatedData",updatedData);
		
		return this.getUserFromSessionID(sessionID).then((currentUser) => {
			console.log("currentUser:",currentUser);
        return users().then((userCollection) => {
			console.log("after collection");
            let updatedUserData = {};
            
            if (updatedData.firstname) {
                updatedUserData.firstName = updatedData.firstname;
				console.log("updatedUserData.firstName:",updatedUserData.firstName);
            } else {
				updatedUserData.firstName = null;
			}

            if (updatedData.lastname) {
                updatedUserData.lastName = updatedData.lastname;
            } else {
				updatedUserData.lastName = null;
			}
			
			if (updatedData.occupation) {
                updatedUserData.occupation = updatedData.occupation;
            } else {
				updatedUserData.occupation = null;
			}
			
			if (updatedData.email) {
                updatedUserData.email = updatedData.email;
            } else {
				updatedUserData.email = null;
			}
			
			
			if (updatedData.contact) {
                updatedUserData.contact = updatedData.contact;
            } else {
				updatedUserData.contact = null;
			}
			
			
			/*let newaddress = {
				streetaddress : updatedData.streetaddress,
				state : updatedData.state,
				zipcode : updatedData.zipcode
				
			}*/
			
		   /*	if (updatedData.streetaddress) {
                updatedUserData.address.streetaddress = updatedData.streetaddress;
            } else {
				updatedUserData.address.streetaddress = null;
			}
			
			if (updatedData.state) {
                updatedUserData.address.state = updatedData.state;
            } else {
				updatedUserData.address.state = null;
			}
			
			if (updatedData.zipcode) {
                updatedUserData.address.zipcode = updatedData.zipcode;
            } else {
				updatedUserData.address.zipcode = null;
			}*/
			
			//updatedUserData.address = newaddress;
			
			/*if (updatedData.address) {
                updatedUserData.address = updatedData.address;
            } else {
				updatedUserData.address = null;
			}*/
			console.log("updatedUserData",updatedUserData);
			
            
            let updateCommand = {
                $set: updatedUserData
            };
			
			console.log("updateCommand",updateCommand);

            return userCollection.updateOne({_id:currentUser._id }, updateCommand).then((result) => {
				console.log("result:",result);
				
                return this.getUserFromSessionID(sessionID);
            });
        });
		});
    },
	
	clearSessionID(sessionID){
		return this.getUserFromSessionID(sessionID).then((currentUser) => {
        return users().then((userCollection) => {
            return userCollection.updateOne({ currentSessionId: sessionID }, { $set: { "currentSessionId": "" } });
			
        });    
		});
		
    },
}

module.exports = exportedMethods;