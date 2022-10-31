let users=[];
let posts=[];
id=1;
const getUsers= ()=>{
    return users;
}
const getUsersByName= (name)=>{
    const usersFilter=users.filter(user =>{
        return user.name===name;
    })
    if(usersFilter.length) return usersFilter; 
    return { error : "Not Users"};
}

const getUserById = (id)=>{
    const userId= users.find((user)=>user.id===parseInt(id));
    if(userId) return userId;
    return { error : "User not found"};
}

const createUser = (name,lastname,email,age)=>{
    const newUser={
        id:id++,
        name,
        lastname,
        email,
        age,
        posts:[]
    };
    users.push(newUser)
    return newUser;
}

const updateUser = (id,name,lastname,email,age)=>{
    const user=users.find((user)=>user.id===parseInt(id));
    if(!user) return {error:"User not found"};

    user.name=name
    user.lastname=lastname;
    user.email=email;
    users.age=age;

    return user;
}

const deleteUser = (id)=>{
    const user=users.find((user)=>user.id===parseInt(id));
    if(!user) return {error:"User not found"};

    users=users.filter(user=>user.id !== parseInt(id));

    return user;
}

let postId=1;
const createPost= (title,contents,userId)=>{
    const user=users.find((user)=>user.id===parseInt(userId));
    if(!user) throw new Error("user not found");
    const newPost={
        id:postId++,
        title,
        contents,
        userId
    };
    posts.push(newPost)
    user.posts.push(newPost.id)
    return newPost;
}

const getPosts= ()=>{
    if(!posts.length) return {error:"Not posts"}
   return posts;
}

const getPostById = (id)=>{
    const postId= posts.find((post)=>post.id===parseInt(id))
    if(postId) return postId;
    return  { error : "POst not found"};
}

const updatePost = (id,title,contents,userId)=>{
    const post= posts.find((post)=>post.id===parseInt(id))
    if(!post) return {error:"Post not found"}

    post.title=title;
    post.contents=contents;
    post.userId=userId;

    return post;
}
const deletePost = (id)=>{
    const post = posts.find((post)=>post.id===parseInt(id));
    if(!post) return {error:"Post not found"}
    posts=posts.filter((posts)=> posts.id !== parseInt(id))
    return post;
}

module.exports={
    getUsers,
    getUsersByName,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
}