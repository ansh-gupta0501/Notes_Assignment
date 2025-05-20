class User{
    constructor(username){
       this.username = username
    }

    logMe(){
        console.log("outer function ");
        
        console.log(this)
        //console.log(`username is ${this.username}`);
        
        function inner(){
            console.log("inner function ");
            
            console.log(this)
        }

        inner()
    }
}

const chai = new User('ansh gupta')

chai.logMe()


const User = {
    name : 'hlo',
    logMe(){
        console.log("outer function ");
        
        console.log(this) //object user 
       
        function inner(){
            console.log("inner function ");
             
            console.log(this) //global 
        }

        inner()
    }
}



User.logMe()

const User = {
    name : 'hlo',
    logMe(){
        console.log("outer function ");
        
        console.log(this) //object user 
       
        const inner = ()=>{
            console.log("inner function ");
             
            console.log(this) //object user  
        }

        inner()
    }
}



User.logMe()

