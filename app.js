const express = require("express");
const bodyParser = require("body-parser");
var fileUpload = require('express-fileupload');
const app = express();
const static = express.static(__dirname + '/public');
var cookieParser = require("cookie-parser");
var bcrypt = require("bcrypt-nodejs");



const configRoutes = require("./routes");

const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
   //  data = {1:1,2:2,3:3,4:4,5:5};
  // defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
    
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};


 



app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.use(cookieParser());
app.use(fileUpload());
app.post('/uploadimage', function(req, res) {
    var sampleFile;
  console.log("inside upload 1:");
 // console.log("inside upload 3: " + req.files.imgInp);
  

   
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    var imgName =req.body.img_name;
   console.log("Image.name:"+req.body.img_name);
   sampleFile = req.files.imgInp;
    sampleFile.mv('../Recipe/public/images/recipe_images/'+imgName, function(err) {
        if (err) {
             console.log("err:" + err);
             // res.status(500).send(err);
            res.status(500).json(err);
        }
        else {
             console.log("success:"+'../Recipe/public/images/recipe_images/filename.jpg');
            // res.send("File Uploaded!!!!!!1");
           // res.render("My-Recipes/userHome", { message:'File uploaded!' });
 
          res.json({message:'File uploaded!'});
        }
    });
});


app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});