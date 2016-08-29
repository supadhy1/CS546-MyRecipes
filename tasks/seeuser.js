const dbConnection = require("../config/mongoConnection");
const uuid = require('node-uuid');

dbConnection().then(db => {
    return db.createCollection("users");
    }).then(function(userCollection) {

            
                return userCollection.insertOne({ _id: uuid.v4(),
                username: "sharmi10",
                encryptedPassword: "password",
                currentSessionId: '',
				userStatus:"Active",
                
                firstName:"Sharmistha" ,
                lastName: "Acharya",
                occupation: "student",
				contact:"21324343558",
				
               
				address: {
					streetaddress:"121 6th ave",
					state:""NY,
					zipcode:"10037"
				}
				}).then(function(newDoc) {
                    return newDoc;
                }).then(() => {
                console.log("Done seeding database");
                db.close();
	
});		