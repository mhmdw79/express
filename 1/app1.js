const express = require("express")
const app = express()
console.log(process.env.KEY_WEB)

app.get("/",(req,res)=>{
    console.log(req.query)
    res.send("hello express")
})

app.get("/api/users",(req,res)=>{
    res.send([
        {id:1, name:"user1"},
        {id:2, name:"user2"}
    ])
})

app.get("/api/users/:id",(req,res)=>{
    console.log(req.params)
    res.send([
        {id:req.params.id,name:req.params.id}
    ])
})
const port = process.env.PORT || 1000
app.listen(port,()=>{
    console.log(`listen on port ${port}`)
})