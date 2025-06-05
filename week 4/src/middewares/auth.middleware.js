// this middlware just verify is user exists or not 

import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiEroor.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'



export const verifyJWT = asyncHandler(async(req,res,next)=>{
  
     // as req have cookies because of cookieParser middlwares . cookies are two way they are in both req and res
 
     // sending token:- Authorization : Bearer <token>
     console.log("cookie",req.cookies)
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")     //as mobiles don't have cookies so we need to check if cookies not there then check in headers
     console.log("token is ",token)
     if(!token) {
         throw new ApiError(401,'unauthorized request')
     }
 
     // if token present then verify token 
 
     console.log("secret",process.env.ACCESS_TOKEN_SECRET)
 
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken") // this _id is available when we sign token
 
     if(!user){
         throw new ApiError(401,"Invalid Access Token")
     }
 
     req.user = user;
     next()
   

})