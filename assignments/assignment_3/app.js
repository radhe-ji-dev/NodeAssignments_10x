const express=require('express');
const app = express();
app.set('view engine', 'ejs')
let users=[{name: 'John', email: 'john@gmail.com'},{name: 'Rony', email: 'tony@gmail.com'},{name:"Toy",email:"roy@gmail.com"}];

// Middlewares 
// 1. to parse incoming  application / x - www - form - urlencoded content type  to string
// describes form data that is sent in a single block in the HTTP message body.
app.use(express.urlencoded({
    extended: true
})) 
// 2. to link public file 
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.render('homepage.ejs',{data:users});
})
app.get('/form', (req, res) => {
    res.render('form.ejs');
})
app.post('/user/add',(req,res)=>{
    // console.log(req.body)
    const obj={
        name: req.body.name,
        email: req.body.email
    }
    users.push(obj)
    res.render('homepage.ejs', { data: users });
} );
app.listen(3000,()=>{
    console.log("im listening");
})