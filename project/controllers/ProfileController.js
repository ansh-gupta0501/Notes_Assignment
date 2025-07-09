class ProfileController {
    // get user 
    static async index(req,res){
        const user = req.user;
        return res.status(200).json({user})
    }

    static async store(){
        
    }

    static async show(){
        
    }

    static async update(){
        
    }

    static async destroy(){
        
    }
}

export default ProfileController