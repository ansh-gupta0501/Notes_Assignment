import { newsSchema } from "../validations/newsValidations.js";
import vine from '@vinejs/vine'
import { errors } from "@vinejs/vine";
import { generateRandomNumber, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";
class NewsController {
    static async index(req,res){
        const news = await prisma.news.findMany({})
        return res.json({news})
    }
    
    static async store(req,res){
       try {
         const user = req.user
         const body = req.body;
 
         const validator = vine.compile(newsSchema)
         const payload = await validator.validate(body)

         if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({errors : {
                image : "Image field is required "
            }})
         }

        const image = req.files?.image

        // image custom validator
        const message = imageValidator(image?.size , image?.mimetype)

        if(message !== null){
            return res.status(400).json({errors : {
                image : message
            }})
        }

        const imgExt = image?.name.split(".")
        const imgName = generateRandomNumber() + "." + imgExt[1];
        const uploadPath = process.cwd() + "/public/images/" + imgName
        
        
        image.mv(uploadPath,(err)=>{
            if(err) throw err
        })
         

        payload.image = imgName
        payload.user_id = user.id

        const news = await prisma.news.create({
            data : payload
        })
         return res.status(200).json({message : " News created successfuly ",news})
 
       } catch (error) {

        if(error instanceof errors.E_VALIDATION_ERROR){

            // console.log(error.messages)
            return res.status(400).json({errors: error.messages})
        }else {
            console.log("Error is ",error)
            return res.status(500).json({message: "Something went wrong.Please try again "})
        }
        
       }


    }

    static async show(req,res){
        
    }
    static async update(req,res){
        
    }
    static async destroy(req,res){
        
    }
}

export default NewsController