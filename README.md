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