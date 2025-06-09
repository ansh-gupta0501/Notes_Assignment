import express from 'express';

// const router = express.Router();

// router.get('/hello',(req,res)=>{
//     res.status(200).json({message : 'Hello, World!'})
// });


// router.post('/users',(req,res)=>{
//     const {password,username} = req.body
//     if(!password || !username){
//         res.sendStatus(400)
//         return
//     }

//     res.send({userId : 0})
// })



// -------------------------------------------------------------------------

// for mocking database  use service in you route via dependency injection 
// suppose this userService is actual database 


export default function createRouter({createUser,getUser}){
    
    const router = express.Router();

    router.post('/users',async(req,res)=>{
        const {password,username} = req.body;
        if(!password || !username){
            return res.sendStatus(400);
        }

        const userId = await createUser(username,password);

        res.send({userId})                 
    })

    return router;
}


// export default router;