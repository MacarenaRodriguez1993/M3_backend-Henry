const express =require("express");
const morgan=require("morgan");
const usersRouter=require('./usersRouter')
const postsRouter=require('./postsRouter')

const server =express();
server.use(express.json())
server.use(morgan("dev"))

server.use('/users',usersRouter);
server.use('/posts',postsRouter);

server.get('/',(req,res)=>{
    res.send("holamundo")
})



module.exports =server;

