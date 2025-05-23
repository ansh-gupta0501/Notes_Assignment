class User{
    constructor(email,password){ 
      
       
    this.email = email;
    this.password = password
  }
}

const ansh = new User('ansh@ai','123')

// console.log(ansh.password);
// console.log(ansh.email)


//but sometimes we want that if someone asks for password , we show them as encrpted password
// or if we call a property than before printing that we want to customize it 
// or we don't want to give access of some methods 
// we done this using getter and setters // getters and setters are by default in every class , if we not write them they show the default behaviour 

// all the properties we make in classes , then these properties become the getter setter as methods
class User1{
    constructor(email,password){  
    this.email = email;
    this.password = password
  }

  //as password is property , so it becomes method in getter
  get password(){
    return this.password.toUpperCase()
  }
}

// const ansh1 = new User1('ansh@ai','123')  // TypeError: Cannot set property password of #<User1> which has only a getter
// console.log(ansh1.password)             //because setter is also needed along with getter as password is property 


class User2{
    constructor(email,password){  
    this.email = email;
    this.password = password
  }

  
  get password(){
    return this.password;
  }

  set password(value){
    this.password = value
    
    
  }
}

// const ansh2 = new User2('ansh@ai','123')  //  RangeError: Maximum call stack size exceeded
// console.log(ansh2.password)             // because at the time of setting value , constructor is called again and again beacause we are also setting value of password in the constructor and in the setter also so js get confused what to do 
                                    // so if we set value in the setter as it then these error can occured 


// to set values 

class User3{
    constructor(email,password){  
    this.email = email;
    this.password = password
  }

  
  get password(){
    return this._password.toUpperCase();
  }

  // to solve this problem we make another variable in the setter as _password because in actual, password is to be set in the setter , so this new variable now set the password  
  // also change in the getter otherwise we see the error again maximum call stack in the getter 
  // now we don't have any need of password set in the constructor because actuall code runs of getter/setter 
  // constructor is setting value of email ,not password, becuase we override it 
  set password(value){
    this._password = value
  }                            // also we are saving the original password, but while getting password , we are return upparcase passsword , 
}

// const ansh3 = new User3('ansh@ai','abc')
// // console.log(ansh3.password) //ABC  // because it is calling getter 
// console.log(ansh3._password) //abc   // but it is calling simple password property which is abc 



// now settting email also 

class User4{
    constructor(email,password){  
    this.email = email;
    this.password = password
  }

  set email(value){
    this._email = value
  }
  
  get email(){
    return this._email.toUpperCase()
  }
  get password(){
    return this._password.toUpperCase();
  }

   
  set password(value){
    this._password = value
  }                             
}

const ansh4 = new User4('ansh@ai','abc')
console.log(ansh4._email) // ansh@ai
console.log(ansh4.email); // ANSH@AI









