import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiEroor.js'
import {User} from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';


const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
       const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // saving refersh token in database 

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})   // we use validateBeforeSave becuase save method will by default check all the required conditions(like password) before saving but here we are just saving tokens 

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,'SOMETHING WENT WRONG while generating tokens ')
    }
}

const getAllUsers = asyncHandler(async(req,res)=>{



//    // Suppose you get page and limit from request query params
//     const page = parseInt(req.query.page) 
//     const limit = parseInt(req.query.limit) 

//     const skip = (page - 1) * limit;    //This tells MongoDB how many documents to skip before starting to collect the results.

//     /*
//         For example:
//         If page = 1, skip = 0 (start from beginning).
//         If page = 2 and limit = 2, skip = 2 (skip first 2 users).
//     */

//     const users = await User.find({ isDeleted: false })
//     .skip(skip)                 ////skip tells MongoDB how many documents to skip.
//     .limit(limit);               // limit restricts how many documents to return.

//     // For total count (to know total pages)
//     const totalUsers = await User.countDocuments({ isDeleted: false });

//     const totalPages = Math.ceil(totalUsers / limit);

//     /*Math.ceil() ensures any fractional result is rounded up.

//         For example:

//         7 users and limit = 2 → totalPages = 4

//         (Page 1: users 1–2, Page 2: 3–4, Page 3: 5–6, Page 4: 7)
//     */

//     res.json({
//         page,
//         limit,
//         totalUsers,
//         totalPages,
//         users
//     });


//using aggregation 

    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit)


  const aggregate = User.aggregate([
    { $match: {isDeleted: false} }, // filter if needed/  If you wanted to filter only users with role = "admin", you would write: { $match: { role: "admin" } }
                    
    { $sort: { name: 1 } }, // Sort alphabetically by name (A-Z)
    /*
        $sort arranges the documents in a specific order.
        1 means ascending order (A → Z or 0 → 100)
        -1 means descending order (Z → A or 100 → 0)
    */
  ]);

  console.log(aggregate)


  const options = {
    page,
    limit
  };

   const result = await User.aggregatePaginate(aggregate, options);

   /*
    Executes your pipeline

    Applies .skip() and .limit() automatically

    Returns paginated results and metadata
   */

    res.json({
        page: result.page,
        limit: result.limit,
        totalUsers: result.totalDocs,
        totalPages: result.totalPages,
        users: result.docs
  });
})


// sofe delete 
const softDelete = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.params.id)
    
    if(!user){
        return new ApiError(400,"user not found")
    }



    user.isDeleted = true;

    await user.save({validateBeforeSave : false});

    return res.status(200).json(new ApiResponse(200,user,'user soft deleted successfuly'))
})

//restore

const restoreUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(!user || !user.isDeleted){
        return new ApiError(400,'user not found or not deleted')
    }

    user.isDeleted = false 
    await user.save({validateBeforeSave : false})

    return res.status(200).json(new ApiResponse(200,user,'user restored successfuly'))
})



const registerUser = asyncHandler( async (req,res)=>{
    
    const {fullname,email,username,password} = req.body
    // if(fullname === ""){
    //     throw new ApiError(400,"Fullname is required")
    // }

    if(
        [fullname,email,username,password].some((field)=>{
            return field?.trim() === ""
        })
    ){
         throw new ApiError(400,"all fields are  required")
    }

    const existingUser = await User.findOne({
        $or: [{email},{username}]
    })

    if(existingUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password
     })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser){
        throw new ApiError(500,'Something went wrong while registering a user')
     }

     return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
     )

     

})


const loginUser = asyncHandler(async (req,res)=>{
    // req body - data
    // username or email based login 
    // find the user 
    // password check 
    // access token and refersh token generation
    // send secure cookies with tokens

    const {email,username,password} = req.body

    if(!(username || email)){
        throw new ApiError(400,'username or email is required')
    }

    const user = await User.findOne({
        $or :[{email},{username}]
    }) 

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,'pasword incorrect')
    }

    // generate access and refersh token 
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id) // we use await becuase in this function database operation are there so it will take time 

    //sending token to cookies 

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   const options = {
    httpOnly : true,
    // secure: true //for https
    secure : false        // for http
   }          // bydefault anyone can modified cookies from frontend but if we use these opitons then cookies can only be modified through server 

   return res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(new ApiResponse(200,{user : loggedInUser,accessToken,refreshToken},"user logged in successfuly"))
})


const logoutUser = asyncHandler(async (req,res)=>{
    //clear the cookies first 
    // remove the refreshtoken from database

    // now for logout , we need userid and that id can be generated from middlewares

    await User.findByIdAndUpdate(
        req.user._id,
        {
        $set : {refreshToken : undefined}
        },
        {
            new : true
        }
    )

    const options = {
    httpOnly : true,
    // secure: true   // for https 
    secure : false   // for http
   }

   return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
   .json(new ApiResponse(200,{},"user logged out"))

})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401,'unauthorized request')
    }

    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)
      if(!user){
        throw new ApiError(401,'invalid refresh token')
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,'refresh token is expired or used ')
    }

    const options = {
        httpOnly : true,
        secure : false 
    }

    const {accessToken,refreshToken}  = await generateAccessAndRefreshToken(user._id)

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{accessToken,refreshToken},"Access token refreshed"))
})  

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user?._id)
    console.log("req.user is ",req.user)
    console.log("user is ",user)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400,'Invalid old password')
    }

    user.password = newPassword;
    await user.save({validateBeforeSave : false})

    return res.status(200).json(new ApiResponse(200,{},'Password changed successfully'))
})


const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,'current user fetched successfully'))
})


const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullname,email} = req.body;
    if(!fullname || !email){
        throw new ApiError(400,'all fields are required')
    }
    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set : {
                fullname,
                email : email
            }
        },{
            new : true
        }).select('-password')

        return res.status(200).json(new ApiResponse(200,user,'account details updated successfully'))

})


const getUserChannelProfile = asyncHandler(async(req,res)=>{
    const {username} = req.params

    if(!username?.trim()){
        throw new ApiError(400,'username is missing')
    }

    //appying aggregation pipeline on user to join user schema and subscription schema
    // note aggregation pipelines will return an array 


   const channel = await User.aggregate([
    //1st pipeline for match field
    {
        $match:{
            username: username
        }
    },
    //till we filter our document based on username on User model.    Now we have only 1 document . On the basis of this document , we have to do lookup (means join)
    // suppose that one user is ansh now we find total subscribers of ansh 

    //2nd pipeline lookup
    {
        $lookup : {
            from: "subscriptions",
            localField: "_id",     // this local field which is present is user
            foreignField: "channel",  // foreign field is channel which means we join user model with subsription model with user id and channel whom this user id subscribed
            as: "subscribers"  // name the joined column as subscribers
        }
    },

    //3rd pipeline to find how many channels ansh has subscribed

    {
        $lookup : {
            from : "subscriptions",
            localField: "_id",
            foreignField: "subscriber",
            as: "subscribedTo"
        }
    },

    // now these two fields are different but we need to add new fields to our user where we find the total count of subscribers and subscribedTo
    //4th pipeline addField ,  it will add the additional fields
    {
        $addFields:{
            subscribersCount:{
               // now in subscribers field , we have all the documents , to count all the documents we use $size operator
                $size: "$subscribers"  // we add $ with subscribers because it is field

            },
            channelsSubscribedToCount:{
                $size : "$subscribedTo"
            },

            // now to show whether the partcular user has subscribed particular channel , we add new field isSubscribed which give either true or false
            isSubscribed:{
                $cond:{
                    if : {$in: [req.user?._id,"$subscribers.subscriber"]},   // in means wheterh req.user._id is present is subcribers or not 
                    then : true,
                    else : false 
                }
            }
        }
    },

    //5th pipeline project. this will allow us to give selective fields only , not all the fields 
    {
        $project: {
            fullname : 1 ,        // to allow the field pass 1 
            username : 1,
            subscribersCount : 1,
            channelsSubscribedToCount : 1,
            isSubscribed : 1,
            email : 1
        }

    }
    



   ])


   // now this channel is an array. 
   console.log("channel ",channel)

   if(!channel?.length){
    throw new ApiError(404,"channel does not exist")
   }

   return res.status(200)
            .json(new ApiResponse(200,channel[0],'user channel feteched successfuly'))

})


// now working with watch history , as watch history is referencing to video schema , so we look up watch histroy with videos schema but we see there is owner in video schema which is also user .
// so  we do nested lookup because when we loop up watchhistory with video schema , we get multiple documnets but in that documents owner will not there 

const getWatchHistory = asyncHandler(async(req,res)=>{
    // not req.user._id will return a string which automatically converts to mongodb id by mongoose
    // but in case of aggregate , this doesn't happen , we need to manually convert this
    const user = await User.aggregate([
        //1st pipeline where we get the user 
        
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.user._id)
            }
        },

        //2nd pipeline : now we get the user , now lookup the watch history with video schema 
        {
            $lookup :{
                from : "videos",
                localField: "watchHistory",
                foreignField : "_id",
                as : "watchHistory",       // // now we got many documents inside watchHistroy field but now need to write subpipeline to get owner details
                pipeline : [
                    {
                        //now we are in video schema , we have to pipeline to users 
                        $lookup:{
                            from: "users",
                            localField: "owner",  // if we see this owner field is in videoschema
                            foreignField: "_id",
                            as : "owner",    //// now we got everthing about owner but we need only few fields
                            pipeline: [   // this pipeline will go to owner field 
                                {
                                    $project : {
                                        fullname : 1,
                                        username : 1
                                    }
                                }
                            ]
                        } 
                    },

                    //now i watch history , we get an array so sometimes in frontend it is diffucult to access that so  as we need only first document so we add a new field where we pass the first object of the array 
                    {
                        $addFields : {
                            owner : {
                                $first : "$owner"
                            }
                        }
                    }
                ]
            }
        }

       
    ])

    return res.status(200).json(new ApiResponse(200,user[0].watchHistory,"watch history fetched successfully "))
})


const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json({ message: "User permanently deleted" });
});

export {
    getAllUsers,
    registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserChannelProfile,
    getWatchHistory,
    softDelete,
    restoreUser,
    deleteUser
}


//  "users": [
//     {
//       "_id": "684165b5788b3c4d9c3ed534",
//       "username": "system",
//       "email": "system@gmail.com",
//       "fullname": "system",
//       "password": "$2b$10$5SATR9PZEjKHI.xvi0/2ZeXWrllGN0Z7Cb8/lg9Qwbrxo4vPkHBqG",
//       "isDeleted": false,
//       "createdAt": "2025-06-05T09:39:01.229Z",
//       "updatedAt": "2025-06-05T09:39:01.229Z",
//       "__v": 0
//     },
//     {
//       "_id": "684165c2788b3c4d9c3ed538",
//       "username": "ansh",
//       "email": "ansh@gmail.com",
//       "fullname": "ansh",
//       "password": "$2b$10$Jqb/RGEt3eFbNJKAQBo0uOdPp0WzsErxi6RH/WWp9hqFG97LzjgmS",
//       "isDeleted": false,
//       "createdAt": "2025-06-05T09:39:14.366Z",
//       "updatedAt": "2025-06-05T09:39:14.366Z",
//       "__v": 0
//     },
//     {
//       "_id": "684165d2788b3c4d9c3ed53c",
//       "username": "gupta",
//       "email": "gupta@gmail.com",
//       "fullname": "gupta",
//       "password": "$2b$10$CWz3fTu6CxbEKcwh7ZbM4uir6AMRmpNq6/rnbH39p.oFS2D1blfmO",
//       "isDeleted": false,
//       "createdAt": "2025-06-05T09:39:30.710Z",
//       "updatedAt": "2025-06-05T09:39:30.710Z",
//       "__v": 0
//     },
//     {
//       "_id": "684165e2788b3c4d9c3ed541",
//       "username": "rohan",
//       "email": "rohan@gmail.com",
//       "fullname": "rohan",
//       "password": "$2b$10$j6YxdTlKCJ/QN7M78hlDw.0IDyIxoAsk7xv16FFpiPsXwRo1jz8EO",
//       "isDeleted": false,
//       "createdAt": "2025-06-05T09:39:46.902Z",
//       "updatedAt": "2025-06-05T09:39:46.902Z",
//       "__v": 0
//     },
//     {
//       "_id": "684165f0788b3c4d9c3ed545",
//       "username": "rajat",
//       "email": "rajat@gmail.com",
//       "fullname": "rajat",
//       "password": "$2b$10$nHwjPbd0WzqmBl72MMqlS.F7buiU2pMROX2cmM35znMpkForBSJXm",
//       "isDeleted": false,
//       "createdAt": "2025-06-05T09:40:00.148Z",
//       "updatedAt": "2025-06-05T09:40:00.148Z",
//       "__v": 0
//     },
//     {
//       "_id": "68416605788b3c4d9c3ed549",
//       "username": "rahul",
//       "email": "rahul@gmail.com",
//       "fullname": "rahul",
//       "password": "$2b$10$zypMSK5LDHEREelsyBRMG.4Q5R.ed7cBhupfhytOSrIY5jNm4yx5q",
//       "isDeleted": false,
//       "createdAt": "2025-06-05T09:40:21.391Z",
//       "updatedAt": "2025-06-05T09:40:21.391Z",
//       "__v": 0
//     }
//   ]


