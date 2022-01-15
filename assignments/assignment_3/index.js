const express = require("express");
const mongoose = require('mongoose');
const todo = require("./model/ToDo");
const bodyparser = require("body-parser");
var methodOverride = require('method-override');
mongoose.connect('mongodb://localhost:27017/todo');
const app = express();

app.use(methodOverride('_method'));
app.use(bodyparser());

app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'ejs');
//GET 
app.get("/", async(req, res) =>{
    //write the code to fetch the data
    var data = await todo.find();
    res.render("home" , {data});
})

// POST 
app.post("/todo/add", async (req, res) =>{
    //console.log(req.body);
    await todo.create({
        todoname: req.body.todo,
        taskstatus:false
    });

    // Write the code to insert the data in db
    res.redirect("/");
});

//PUT
app.put("/todo/:id/complete", async (req, res) =>{
    await todo.updateOne({_id: req.params.id}, {taskstatus: true})
    res.redirect("/");
})

// DELETE
app.delete("/todo/:id/delete", async (req, res) =>{
    await todo.deleteOne({_id: req.params.id})
    res.redirect("/");
})

app.listen(5000, ()=> console.log("Server is listening"));