// Create a NodeJs project using npm init, install express, ejs and any other dependencies 
//required
// Create a list of users on the backend and show them in a table on the frontend 
// with the following data - name, email, age, city, profession (the base route Ex: 
// localhost:300 should render this table)
// Add a button below the table to add a user which would redirect to /user/add. 
//This should contain a form with all the input fields mentioned above to create a user.
// On submitting the form, the user should should be added to the list and the page 
// should rAedirect to the home page i.e. localhost:3000 which shows the table 
// (you should see the new user added to the table)

const express = require("express");
const bodyparser = require("body-parser");
const faker = require("faker");
const app = express();

app.use(bodyparser());

var users = [];
for(let i = 0; i<10; i++){
    users.push({
        name:faker.name.findName(),
        email: faker.internet.email()
        // age: faker.inetage(),
        // city:faker.city(),
        // profession: faker.profession()
    })
}
app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    res.render("home.ejs", {users});
});

app.get("/form", (req, res) =>{
    res.render("form.ejs");
});

app.post("/add/user", (req, res) =>{
    //console.log(req.body);
    ///push the  data
    users.push({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        city: req.body.city,
        profession: req.body.profession
    })
    res.redirect("/");
});

app.get("/remove/user", (req, res) =>{
    users.pop();
    res.redirect("/");
})

app.listen(3000, ()=> console.log("Server is running"));
