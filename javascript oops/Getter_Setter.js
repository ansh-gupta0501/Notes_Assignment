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
// we done this using getter and setters 

const regularFunc = function() {
  console.log(arguments); 
};

const arrowFunc = () => {
  console.log(arguments); 
};

regularFunc(1, 2, 3);   //{ '0': 1, '1': 2, '2': 3 }
arrowFunc(1, 2, 3);    

