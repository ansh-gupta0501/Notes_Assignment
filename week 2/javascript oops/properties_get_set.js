function User(email,password){
    this._email = email;
    this._password = password

    Object.defineProperty(this,'email',{
        get : function(){
            return this._email.toUpperCase()
        },
        set : function(value){
            this._email = value
        }
    })                                          // this defineProperty is actually the getter setter 
                                                // in this defineProperty , we have to pass context first which is this and then the property we want to set as getter/setter 

    
        Object.defineProperty(this,'password',{
        get : function(){
            return this._password.toUpperCase()
        },
        set : function(value){
            this._password = value
        }
    }) 
}       

const chai = new User('chai@chai.com','chai')
console.log(chai.password)  // CHAI

console.log(chai.email) //CHAI@CHAI.COM

console.log(chai._email) //chai@chai.com

console.log(chai._password) //chai