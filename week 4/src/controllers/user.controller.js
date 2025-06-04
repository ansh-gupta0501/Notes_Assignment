import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiEroor.js'
import {User} from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js';
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

export {registerUser};

