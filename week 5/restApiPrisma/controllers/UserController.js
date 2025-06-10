import {prisma} from '../DB/db.config.js'

export const createUser = async(req,res)=>{
    const {name,email,password} = req.body;

    const findUser = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if(findUser){
        return res.json({
            status : 400,
            message : "Email already taken"
        })
    }

    const newUser = await prisma.user.create({
        data : {
            name : name,
            email : email,
            password : password
        }
    })

    return res.status(200).json({
        data : newUser,
        message : "user created"
    })
}


export const updatedUser = async (req,res)=>{
    const userId = req.params.id
    const {name,email,password} = req.body;

    await prisma.user.update({
        where : {
            id : Number(userId)
        },

        data : {
            name : name,
            email : email,
            password : password
        }

    })

    return res.status(200).json({
        message : "User updated successfuly "
    })
}

export const fetchUsers = async(req,res)=>{
    //const users = await prisma.user.findMany({})

    //now we want users along with their posts

    //  const users = await prisma.user.findMany({
    //     include : {
    //         post : true,           // we see in schema this post field in user model
    //         comment : true
    //     }                   
    //  })

    // now we want selective fields in post 

    //  const users = await prisma.user.findMany({
    //     include : {
    //         post : {
    //             select : {
    //                 title : true,
    //                 comment_count : true
    //             }
    //         }           
    //     }                   
    //  })


    // now we want post count only 

    //   const users = await prisma.user.findMany({
        
    //     // select : {
    //     //     _count : {
    //     //         select : {
    //     //             post : true,
    //     //             comment : true
    //     //         }
    //     //     }
    //     // }        // it does not show the complete data of user , shows only post count 
        
    //     // include : {
    //     //     _count : {
    //     //         select : {
    //     //             post : true
    //     //         }
    //     //     }
    //     // }
    //  })       // this tells  the post count and  it  show the complete data of user



    //nesting

    const users = await prisma.user.findMany({
        include : {
            post : {
                include : {
                    comment : true
                }
            }           
            
        }                   
     })
    return res.status(200).json({data : users})
}

export const showUser = async(req,res)=>{
    const userId = req.params.id;

    const user = await prisma.user.findFirst({
        where :{
            id : Number(userId)
        }
    })

    return res.status(200).json({data : user})
}

export const deleteUser = async (req,res)=>{
    const userId = req.params.id

    await prisma.user.delete({
        where : {
            id : Number(userId)
        }
    })

    return res.status(200).json({message : "user deleted sucesfuly"})
}