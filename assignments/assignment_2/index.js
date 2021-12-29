const fs= require("fs")
const http= require("http")
const server =http.createServer((req,res)=>{
    const file=fs.readFileSync("index.html", "utf8");
    res.end((file))
});
server.listen(3000,"localhost")