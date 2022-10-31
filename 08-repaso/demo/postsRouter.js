const {Router}=require("express");

const postsRouter =Router();
const{ createPost,getPosts,getPostById,updatePost,deletePost}= require('../demo/models/controllers');

postsRouter.post('/',(req,res)=>{
    try {
        const {userId,title,contents}=req.body;
        if(!userId || !title || !contents) throw new Error("missing information")
        const newPost=createPost(title,contents,userId)
   
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error.message)
    }
})
postsRouter.get('/',(req,res)=>{
    const posts=getPosts();
    if(posts["error"]) return res.status(400).json(posts);
    return res.status(200).json(posts);
})
postsRouter.get('/:id',(req,res)=>{
    const{id}= req.params;
    const post = getPostById(id);
    if(post["error"]) return res.status(400).json(post)
    else return res.status(200).json(post)
})

postsRouter.put('/',(req,res)=>{
    const{id,title,contents,userId}=req.body;
    if(!id || !title || !contents || !userId)
        return res.status(400).json({error:"missing information"})
    const updatedPost = updatePost(id,title,contents,userId);
    if(updatedPost["error"]) return res.status(400).json(updatedPost)
    return res.status(200).json(updatedPost)
})

postsRouter.delete('/:id',(req,res)=>{
    const{id}=req.params;
    const post = deletePost(id);
    if(post["error"]) return res.status(400).json(post);
    return res.status(200).json(post)
})

// ruta get post => para traer todos los post
// ruta getId post/:ID=> para traer un post en particular

//ruta put post para editar 
// ruta delete para elimina

module.exports=postsRouter;