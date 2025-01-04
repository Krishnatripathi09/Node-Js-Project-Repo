# Node-Js-Project-Repo
Repo for Project  in Node Js 



node_modules folder contains all the dependencies that our project requires to run it is like a database for 
our app which contains all the dependencies that our project  needs to run .

"express": "^4.21.2"

when we install a dependency it is installed with some version the first 
digit in version (4) means major update verison which is not backward compatible and it can 
break our app if we install the major verison in our app which is running on minor version
for eg: we are using version 4.x.x in our app and we install 5.x.x version so it represents some major update 
in our app and it could break our application

The second digits (21) represents minor updates which can be installed in our app and wil not do any harm 
The third digits (2) represents patch updates which are also safe to install in our app and will
not do any harm.

(^) symbol means our app can accept minor and path updates without any issue 
(~) symbol means our app avoids version updates that could introduce new features or bugs
if it does not have any symbol then it means that project needs exact dependencies to run.

while pacakage.json is flexible with installing new minor updates or patch versions but pacakage.lock.json
will install exact version of the dependency and will not accept any changes in its version minor or major

installed nodemon globally (npm install -g nodemon) to refresh our app as soon as we do some changes in our app
now we run our app using nodemon src/app.js. We can use nodemon from any directory as we have installed 
it globally

we can add a script in package.json to run our app just using npm run dev as we have add the 
scripts ""scripts": {
    "start":"node src/app.js",
    "dev":"nodemon src/app.js"
  }" in our package.json file



We can delete our node_modules folder and we can run command npm install so it will again create
node_modules folder with all the dependencies that our project requires to run. when we run npm install 
it goes to package.json and checks the dependencies section there it finds express and installs all the 
dependencies again

## Route Handling
If we have a route which starts with / and we have some piece of info to show after that for eg:(app.use("/", (req, res) => {
  res.send("Namaste World");
});) 
 so if we try to access any path after this "/" then it will overwrite that path  with its content 
 for eg: if we have a similar route with name /test which shows "Hello world" on screen but if the "/" is 
 active then it will display "Namaste World" on the screen and will overwrite anything that is there 
 inside the /test route 

 We can avoid this by changing the order of port for eg:

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/hi", (req, res) => {
  res.send("Hello Page ba");
});

app.use("/", (req, res) => {
  res.send("Namaste World");
});


Now in above case all routes will work as we have changes the order of execution of routes

In above Api route we have used app.use so it will match all the routes like get,put,post or delete 
but to to match the specific route we have to use app.get 

if we swap the order of (req, res) writing req and res in parameters then it will thorow error because
req Contains information about the HTTP request, such as headers, query parameters, and the request body.
and res is Used to send the HTTP response back to the client.
so if we swap the order of writing them it will throw an error  because the res object doesn't have the properties and methods expected for a request object, and vice versa.

# Optional Chaining in Api Path

In our routes we can make our path as optional by putting a question mark for example if we have a path 
"/test/abc" then we can make the path optional by using a question mark after the path like "/test/ab?c"
so here b is optional like if we write the full path on postman to this path it will work "/test/abc" but if we 
write it like "/test/ac" then it will also point to that path as we have kept b as optional

# + Opeartor in Path
We can also add (+) operator in path so we can add multiple letter in front of which we have added+ (bbbb) in our path unless starting and ending letter is same
for eg: "/test/ab+c" so if try to acess the path like "/test/abbbbbbbbbbc" then as well it will work

# * Opeartor in Path
we can also write(*) opeartor in path and it means unless and until starting and ending letters match we can give anything in between the path for eg: we have path "/test/abccd/" then we can write it like
/test/a*d/ and it will hit the path

# () group Operator 
Here we can use () to group some characters in path for eg: if we have path "/test/a(bc)?d then even if we do not
write the bc in our path it will hit the correct path as we made the bc optional in our path"/test/ad"
We Can also Write REGEX in our Api paths to make more Dynamic

# Read the Query Params
We can read the query params in our api by using req.query for eg: if we have a path /ab?c then we can 
add console.log(res.query) in its body and in post man we can add some query params which will be printed 
in our Console

# Params 
We can also add Dynamic routes by using "/abc/:user" so here (:) giving colon we can add dynamic path 
and we can read it by using req.params so here userId is the dynamic path which we are accessing.
for eg (app.get("/users/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "YTU", lastName: "Tripathi" });
});)


If we do not put any response inside our Route then the request from postman will run like an infinite loop 
as we have not set any response in our call :for eg: "app.use("/user", (req, res) => {
 //No Reponse
});"

we can wrap our responses in array and then send them like below if we have many responses 
app.use("/user", [
  (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    next();
  },
  (req, res, next) => {
    console.log("I am third response");
    next();
  },
  (req, res, next) => {
    console.log("I am 4th response");
    next();
  },
  (req, res, next) => {
    console.log("I am 5th response");
    next();
  },
]);

or we can wrap 2 or 3 or 4 responses in an array then we can send them 
for eg:
app.use("/user", [
  (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    next();
  },],
  (req, res, next) => {
    console.log("I am third response");
    next();
  },
  (req, res, next) => {
    console.log("I am 4th response");
    next();
  },
  (req, res, next) => {
    console.log("I am 5th response");
    next();
  },
);

we can use the routes like this in any http method Get,put,post and delete ,patch

next() function  : It is a callback function that passes control to the next middleware function in the request-response cycle. Without calling next(), the request will not proceed to the next middleware or route handler.

for eg: (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    res.send("send the response )
  },

  if we do not add next() function the control will not be passed to next route handler and as first 
  handler does not have any reponse the api call to this path will run like an infinite loop 

  # MiddleWare Functions
Middleware in Express.js is any function that has access to the req, res, and next objects and is used to handle a part of the request-response cycle.
Middleware functions can be chained using next(), but only one function should send a response (e.g., res.send(), res.json(), etc.).
If you don't call next() in a middleware, the next middleware or route handler will not be executed.
If you use res.send() in a middleware, the request-response cycle ends, and subsequent middleware or handlers are not executed.

    For eg: (req, res, next) => {
    console.log("I am first response");
    next();
  },
  (req, res, next) => {
    console.log("I am second response");
    res.send("send the response )
  },

  function which actually send the response back are known as response handlers.

  To export anything in node js as default export we have to export it using module.exports={adminAuth} then we can import it like  const { adminAuth } = require("./middlewares/auth");

  # Connecting to DataBase 
  Use the connection string "mongodb://user:password@localhost:27017/mydatabase?authSource=admin"
to connect to database and we are going to use mongoose to connect to Database
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://user:password@localhost:27017/mydatabase?authSource=admin"
  );
};
connectDB()
  .then(() => {
    console.log("connected to database :)");
  })
  .catch((err) => {
    console.log("Database connection Failed:", err);
  });

so to connect to our databse we installed mongoose and passed our connection string inside mongoose.connect
which is used to connect to data base as mongoose.connect will return a promise we have awaited it and wrapped it inside a async function and then called the function which would then connect to databse or throw 
an error based on output it gets.

We have connected to database after starting our server but in Actual scenarios this is a bad way to connect to database after server is started. first our server should connect to database then the server should be started as users might start to send API calls before our server actually starts that's why now we are exporting our code in databse.js file and call the connect to database function before server starts in app.js 
"const connetDB = require("./config/database");
const express = require("express"); //we have installed express in our project and it is installed in Node_module so we are importing it from there

const app = express();

connectDB() // Called the function to connect to databse first
  .then(() => {
    console.log("connected to database :)");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");// Then start the server to listen API Calls
    });
  })
  .catch((err) => {
    console.log("Database connection Failed:", err);
  });
"
After connecting to database we need to create a userSchema to for our users with below configuration
"const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  Age: { type: Number },
  password: { type: String },
  gender: { type: String },
});
for which we have created a folder models inside that we have create our user.js file to create the schema.
Once we have created our schema we have to create mongoose model( Table )to start using our schema as we have
created our schema for Users then we will create a User model(Table) with defined schema configuration.
we can create the model (Table) using mongoose.model("TableName",schemaForTable) and then export it using
default exports.
For eg:const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
or we can directly export it like module.exports = mongoose.model("User", userSchema);