const User = {
    _email : 'h@hc.com',
    _password : 'abc',

    get email(){
        return this._email.toUpperCase()
    },
    set email(value){
        this._email = value
    }
}

const tea = Object.create(User) // create object on the basis of user and refers to tea 
// console.log(tea);  // object
// console.log(tea.email) //H@HC.COM

// this _email, _password can be taken as private properties but we can able to access that althought we use getter/setter 
// but in actuall to make private properties use #


/* 
 why tea giving {} but tea.email giving email ?



const tea = Object.create(User);
tea is created with User as its prototype.

tea itself has no own properties initially.

Its prototype (User) does have properties, including _email and the getter for email


When you log an object in JavaScript, it usually shows only the object's own enumerable properties.

tea has no own properties at all — it inherits everything from User.

So, the console shows {} because it is an empty object itself.

When accessing tea.email, JavaScript looks for a property email on tea.

It doesn’t find one directly on tea, so it looks up the prototype chain and finds the getter for email on User.

The getter returns this._email.toUpperCase().

Since this inside the getter refers to the object that was used to access the property (tea), it looks for _email on tea.

tea doesn’t have _email itself, so it looks up the prototype chain to User and finds _email = 'h@hc.com'.

The getter converts it to uppercase and returns "H@HC.COM"
*/ 



