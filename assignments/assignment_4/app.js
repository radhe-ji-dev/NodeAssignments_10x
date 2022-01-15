// Create a NodeJs project using npm init, install express, ejs and any other dependencies 
//required
// Create a list of users on the backend and show them in a table on the frontend 
// Assignment 4        Sept 23 2021
// This assignment depends upon the previous assignment
// Create a users schema, store the new user in the database wherever the 
//form is submitted from the UI
// The schema should contain the same fields name, email, age, city, profession with an 
//additional field called selected which is Boolean (false by default)
// Instead of a list/array on the backend, change your code to store and fetch the users in mongodb.
// Add routes to edit the user and Delete the User
// Create select Button in every user row to mark selected as true and delete button in every row to delete the user


const express = require("express");
const bodyparser = require("body-parser");
const faker = require("faker");
const mogoose = require("mongoose");
const User = require("./model/user");
var methodOverride = require('method-override')
const app = express();

mogoose.connect("mongodb://localhost:27017/users");
app.use(bodyparser());

app.use(express.static("public"));
app.use(methodOverride('_method'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", async (req, res) =>{
    const users = await User.find();
    console.log(users);
    res.render("home.ejs", {users});
});

app.get("/form", (req, res) =>{
    res.render("form.ejs");
});

app.post("/add/user", async (req, res) =>{
    //Create records in database
    await User.create(req.body);
    res.redirect("/");
});

app.put("/edit/:id/user", async (req, res) =>{
    console.log("I am in edit");
    await User.updateOne({_id: req.params.id}, {selected: true});
    res.redirect("/");
});

app.delete("/delete/:id/user", async (req, res) =>{
    console.log("I am in delete");
    await User.deleteOne({_id: req.params.id});
    res.redirect("/");
})
app.listen(3000, ()=> console.log("Server is running"));
