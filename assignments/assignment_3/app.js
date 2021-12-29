const express=require('express');
const app = express();
app.set('view engine', 'ejs')
let users=[{name: 'John', email: 'john@gmail.com'},{name: 'Rony', email: 'tony@gmail.com'},{name:"Toy",email:"roy@gmail.com"}];
app.use(express.static(__dirname + '/public'));
app.get('/', (req,res) => {
    res.render('homepage.ejs',{data:users});
})
app.listen(8000,()=>{
    console.log("im listening");
})