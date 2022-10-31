// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
let index = 0
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

//*******************POST /posts
server.post('/posts',function(req,res){
    const { author,title,contents}= req.body
    
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR)
            .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }else{
        index++;
        const newPost ={
            id:index,
            author,
            title,
            contents
        }
        posts.push(newPost)
        res.json(newPost)
    }
})
//*******************POST /posts/author/:author
server.post('/posts/author/:author',(req,res)=>{
    const { title,contents}= req.body
    let author=req.params.author
    if(!author|| !title || !contents){
        res.status(STATUS_USER_ERROR)
            .json( {error: "No se recibieron los parámetros necesarios para crear el Post"})
    }else{
        index++;
        const newPost ={
            id:index,
            author,
            title,
            contents
        }
        posts.push(newPost)
        res.json(newPost)
    }
})

//********************** GET /posts
server.get('/posts',(req,res)=>{

    const{ term } =req.query

    if(term){
        const filtrafo= posts.filter(p=>
            p.title.includes(term) || p.contents.includes(term)
        )
        return res.json(filtrafo)
    }
    res.json(posts)

})
//**************** GET /posts/:author
server.get('/posts/:author', (req, res) => {
    let authorParam= req.params.author
    let filtrado=[]
    for(let i=0;i<posts.length;i++){
        if(posts[i].author===authorParam){
            filtrado.push(posts[i])
        }
    }
    if(filtrado.length===0){

       return  res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
    res.json(filtrado)
    /*const filtrados =posts.filter( p => p.author===authorParam)
    if(filtrados.length===0){
        return  res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }
    res.json(filtrados)
    */
})

//**************** GET /posts/:author/:title
server.get('/posts/:author/:title', (req,res)=>{
    let authorParam=req.params.author;
   let titleParam=req.params.title
    let filtrado=[]

    for(let i=0;i<posts.length;i++){
        if(posts[i].author===authorParam && posts[i].title===titleParam){
            filtrado.push(posts[i])
        }
    }
    if(filtrado.length===0){

       return  res.status(STATUS_USER_ERROR).
        json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
    res.json(filtrado)
   
})

//**************** PUT /posts
server.put('/posts', (req,res)=>{
    const { id, title,contents}= req.body
    if(!id || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const post = posts.find(p=>p.id===id)

    if(!post){
        return res.status(STATUS_USER_ERROR).json({error:"No se encontró el post"})
    }

    post.title=title;
    post.contents=contents;

    res.json(post)
})


//**************** DELETE /posts
server.delete('/posts', (req,res)=>{
    const{id}=req.body;
   

    if(!id){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
     const post=posts.find(p => p.id === id)
    if(!post){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    posts=posts.filter( p => p.id !==id)
    res.json({ success: true })
})


//************* DELETE /author
server.delete('/author' , (req,res)=>{
    const{author}=req.body;

    if(!author){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }

    const post = posts.filter( p => p.author===author)

    if(post.length===0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }
    posts=posts.filter( p => p.author !==author)
    res.json(post)
})

module.exports = { posts, server };
