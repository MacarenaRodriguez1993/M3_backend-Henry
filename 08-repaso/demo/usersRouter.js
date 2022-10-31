const {Router}=require("express");
//const express = require("express");
const {
    getUsers,
    getUsersByName,
    getUserById,
    createUser,
    updateUser,
    deleteUser} =require('../demo/models/controllers');

const usersRouter =Router();
// const usersRouter=express.Router();


usersRouter.get('/',(req,res)=>{
   const{name}=req.query;
    if(name){
        const users= getUsersByName(name);
        if(users["error"]) return res.status(400).json(users)
        else return res.status(200).json(users)
    }else{
        const users=getUsers();
        return res.status(200).json(users)
    }
})

usersRouter.get('/:id',(req,res)=>{
    const {id}= req.params;
    const user = getUserById(id);
    if(user["error"]) return res.status(400).json(user)
    else return res.status(200).json(user)
})

usersRouter.post('/',(req,res)=>{
    const{name,lastname,email,age}=req.body;
    if(!name || !lastname || !email || !age)
        return res.status(400).json({error:"missing information"});
    
    const newUser=createUser(name,lastname,email,age)
    res.status(200).json(newUser)

});

usersRouter.put('/',(req,res)=>{
    const{id,name,lastname,email,age}=req.body;
    if(!id ||!name || !lastname || !email || !age)
        return res.status(400).json({error:"missing information"});
    
    const update=updateUser(id,name,lastname,email,age)
    if(update["error"]) return res.status(400).json(update);
    else res.status(200).json(update)

});

usersRouter.delete('/:id',(req,res)=>{
    const{id}=req.params
    const deletedUser = deleteUser(id)

    if(deletedUser["error"]) return res.status(400).json(deletedUser);
    else res.status(200).json(deletedUser)

})



module.exports=usersRouter;