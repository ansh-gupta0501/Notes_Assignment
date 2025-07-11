import { newsSchema } from "../validations/newsValidations.js";
import vine from '@vinejs/vine'
import { errors } from "@vinejs/vine";
import { generateRandomNumber, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";
import NewsApiTransform from "../transformer/newsApiTransform.js";
class NewsController {
    static async index(req,res){
        const news = await prisma.news.findMany({
            include : {
                user : true
            }
        }) // this news will be an array 
        
    /*
        we get news like this 

         
    "news": [
        {
            "id": 1,
            "user_id": 1,
            "title": "Breaking news",
            "content": "nbjbhvghjklkhbjghnvg",
            "image": "577e940f-bc8d-4fa6-94ec-974b02b7ddbc.png",
            "created_at": "2025-07-10T10:06:30.670Z",
            "updated_at": "2025-07-10T10:06:30.670Z"
        },
        {
            "id": 2,
            "user_id": 1,
            "title": "Breaking news",
            "content": "nbjbhvghjklkhbjghnvg",
            "image": "21b76eb9-51b5-4914-8872-677706854fa0.png",
            "created_at": "2025-07-10T10:07:22.512Z",
            "updated_at": "2025-07-10T10:07:22.512Z"
        }
    ]

    */

    // need to transform this news so that we get image link and other details 
        
        const newsTransform = news?.map((item)=>{
            return NewsApiTransform.transform(item)
        })
        return res.json({news : news}) 


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