import {prisma} from '../DB/db.config.js'






export const createComment = async(req,res)=>{
    const {user_id,post_id,comment} = req.body;

    //increase the comment counter in post model 
    await prisma.post.update({
        where : {
            id : Number(post_id)
        },
        data : {
            comment_count : {
                increment : 1     // increment the previous value by 1
            }
        }
    })


    const newComment = await prisma.comment.create({
        data : {
           user_id : Number(user_id),
           post_id : Number(post_id),
           comment
        }
    })

    return res.status(200).json({
        data : newComment,
        message : "comment created successfuly"
    })
}


export const updatedComment = async (req,res)=>{
    const commentId = req.params.id
    const {user_id,post_id,comment} = req.body;


    await prisma.comment.update({
        where : {
            id : commentId
        },

        data : {
            user_id,
            post_id,
            comment
        }

    })

    return res.status(200).json({
        message : "comment updated successfuly "
    })
}

export const fetchComments = async(req,res)=>{
    // const comments = await prisma.comment.findMany({})


    const comments = await prisma.comment.findMany({
        include : {
            user : true, // who did comment

            post : {  // above user who commented on this post 
                include : {
                    user : true       // user who made that post 
                }
            },
            
        }
    })


    return res.status(200).json({data : comments})
}

export const showComment = async(req,res)=>{
    const commentId = req.params.id;

    const comment = await prisma.comment.findFirst({
        where :{
            id : commentId
        }
    })

    return res.status(200).json({data : comment})
}

export const deleteComment = async (req,res)=>{
    const commentId = req.params.id
    const {post_id} = req.body
    //decrease the comment counter in post model 
    await prisma.post.update({
        where : {
            id : Number(post_id)
        },
        data : {
            comment_count : {
                decrement : 1     // decrement the previous value by 1
            }
        }
    })

    await prisma.comment.delete({
        where : {
            id : commentId
        }
    })

    return res.status(200).json({message : "comment deleted sucesfuly"})
}