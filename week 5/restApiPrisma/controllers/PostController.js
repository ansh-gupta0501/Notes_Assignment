import {prisma} from '../DB/db.config.js'

export const createPost = async(req,res)=>{
    const {user_id,title,description} = req.body;

    const newPost = await prisma.post.create({
        data : {
           user_id : Number(user_id),
           title,
           description
        }
    })

    return res.status(200).json({
        data : newPost,
        message : "post created"
    })
}


export const updatedPost = async (req,res)=>{
    const postId = req.params.id
    const {user_id,title,description} = req.body;


    await prisma.post.update({
        where : {
            id : Number(postId)
        },

        data : {
            user_id,
            title,
            description
        }

    })

    return res.status(200).json({
        message : "post updated successfuly "
    })
}

export const fetchPosts = async(req,res)=>{
    // const posts = await prisma.post.findMany({})

    // we want all the comments of the post

    // const posts = await prisma.post.findMany({
    //     include : {
    //         comment : true,
    //         user : true
    //     }
    // })

    // include user inside comment (nesting ) and sorting 

    //  const posts = await prisma.post.findMany({
    //     include : {
    //         comment : {
    //             include : {
    //                 // user : true

    //                 //selective fiels

    //                 user : {
    //                     select : {
    //                         name : true
    //                     }
    //                 }
    //             }
    //         },
           
    //     },
    //     orderBy : {
    //         id : 'desc'
    //     }
    // })


    // filtering 

    //showing posts having more than 1 comment 

    // const posts = await prisma.post.findMany({
    //     include : {
    //         comment : {
    //             include : {
    //                 // user : true

    //                 //selective fiels

    //                 user : {
    //                     select : {
    //                         name : true
    //                     }
    //                 }
    //             }
    //         },
           
    //     },

    //     //sorting
    //     orderBy : {
    //         id : 'desc'
    //     },

    //     // filtering on basis on comment_count
    //     // where : {
    //     //     comment_count : {
    //     //         gt : 1     // commnet count greater than 1 
    //     //         // gt : 2 // count greater than 2 (2 not included )
    //     //     }
    //     // },

    //     //filtering on basis of name

    //     // where : {
    //     //     title : {
    //     //         startsWith : "title",
    //     //         endsWith : "post",
    //     //         equals : "title of post "

    //     //     }
    //     // }

    //     //combining both

        
    //     where: {
    //         AND: [
    //                 {
    //                     comment_count: {
    //                                         gt: 1
    //                     }
    //                 },
    //                 {
    //                     title: {
    //                                 startsWith: "title"
    //                     }   
    //                 }
    //         ]
    //     }
    // })

    //pagination 

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    
    
    if(page < 0) {
        page = 1
    }

    if(limit < 0 || limit > 100){
        limit = 10
    }


    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
        skip : skip,
        take : limit ,
        include : {
            comment : {
                include : {
                    // user : true

                    //selective fiels

                    user : {
                        select : {
                            name : true
                        }
                    }
                }
            },
           
        },
    
    })


    // to get total posts
    
    const totalPosts = await prisma.post.count() // it will give the count of all posts on database 

    const totalPages = Math.ceil(totalPosts/limit)




    return res.status(200).json({
        data : posts,
        meta : {
            totalPages,
            totalPosts,
            currentPage : page ,
            limit : limit
        }
    })
}

export const showPost = async(req,res)=>{
    const postId = req.params.id;

    const post = await prisma.post.findFirst({
        where :{
            id : Number(postId)
        }
    })

    return res.status(200).json({data : post})
}

export const deletePost = async (req,res)=>{
    const postId = req.params.id

    await prisma.post.delete({
        where : {
            id : Number(postId)
        }
    })

    return res.status(200).json({message : "post deleted sucesfuly"})
}


// to search the post using full text search

export const searchPost = async (req,res)=>{
    const query = req.query.q 

    const posts = await prisma.post.findMany({
        where : {
            description : {
                search : query
                // contains : query
            }
        }
    })

    return res.status(200).json({data : posts})
}

/* 
Stop words are common words like:

"of"
"the"
"a"
"and"
"in"
These are ignored by PostgreSQL's full-text search engine because they are considered too common to be useful in search queries.
*/