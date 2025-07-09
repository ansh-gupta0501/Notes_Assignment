import prisma from '../DB/db.config.js'
import vine,{errors} from '@vinejs/vine'
import { registerSchema,loginSchema } from '../validations/authValidation.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
class AuthController{
    static async register(req,res){
        try {
            const body = req.body;
            const validator = vine.compile(registerSchema)
            const payload = await validator.validate(body) // it will throw the error 

            // check if email is exist 
            const findUser = await prisma.users.findUnique({
                where:{
                    email: payload.email
                }
            })

            if(findUser){
                return res.status(400).json({errors : {
                    email : "Email already taken . Please used another one "
                }})
            }
            // encrypt password 
            const salt = bcrypt.genSaltSync(10)
            payload.password = bcrypt.hashSync(payload.password,salt)

            //adding data to database
            const user = await prisma.users.create({data: payload})

            return res.status(200).json({message: "User created successfuly ",user})
        } catch (error) {
            if(error instanceof errors.E_VALIDATION_ERROR){
                // console.log(error.messages)
                return res.status(400).json({errors: error.messages})
            }else{
                return res.status(500).json({message: "Something went wrong.Please try again "})
            }
        }
    }

    static async login(req,res){
        try {
            const body = req.body;
            const validator = vine.compile(loginSchema)
            const payload = await validator.validate(body)

            // find user with email 
            const findUser = await prisma.users.findUnique({
                where : {
                    email : payload.email
                }
            })

            if(findUser){

                if(!bcrypt.compareSync(payload.password,findUser.password)){
                    return res.status(400).json({errors : {
                        email : "Invalid Credientails  "
                    }})
                }

                 // Issue token to user 
                const payloadData = {
                    id : findUser.id,
                    email : findUser.email,
                    name : findUser.name,
                    profile : findUser.profile
                }

                const token = jwt.sign(payloadData,process.env.JWT_SECRET,{
                    expiresIn : "365d"
                })


                return res.json({message : "Logged in ",access_token:`Bearer ${token}` })
            }


            return res.status(400).json({
                errors : {
                    email : "No user found with this email "
                }})

        } catch (error) {
            if(error instanceof errors.E_VALIDATION_ERROR){
                // console.log(error.messages)
                return res.status(400).json({errors: error.messages})
            }else{
                return res.status(500).json({message: "Something went wrong.Please try again "})
            }
        }
    }

}

export default AuthController