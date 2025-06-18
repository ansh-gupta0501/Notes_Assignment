const score: Array<number> = []
const names: Array<string> = []

// i want to create an identity such that it accepts either a number or maybe a boolean 
function identityOne(val: boolean | number) : boolean | number{
    return val          // now it can either be boolean or either be number  // but we can solve this problem using if condition to check if typeof val is boolean then return boolean else return number 
}                     // but if we also want string , we need to add many | operator in this 

// to solve this problem , we can use any but we know any should not be used 
// also we can't identify the type of variable in any case like if we input number and it returs string so this is valid in case of any but we don't want this 
function identityTwo(val : any): any{
    return val
}

// now to solve the problem we use generics
function identityThree<Type>(val: Type): Type{ // Type is not fixed you can use any name
    return val
}
// now difference in this generics type and any type is that in case of any , val can be anything and return type can also by anything. Take number as input and return a string . 
// but in case of generics , it say i am going to accept any type (numbers or string or boolean or any type )but then the value type will be locked . means if val is number then return type also set up automatically to number 
// console.log(identityThree(3))  // function identityThree<3>(val: 3): 3
// console.log(identityThree("3")) // function identityThree<"3">(val: "3"): "3"
// console.log(identityThree(true))  // function identityThree<true>(val: true): true

// shortcut way to define above generic

function identityFour<T>(val: T): T{ // T is not fixed you can use any name
    return val
}

// we can create our own type and pass on this 

interface Bottle{
    brand: string,
    type: number
}

// console.log(identityFour<Bottle>({brand: "brand",type: 5}))  // if we pass our own data type then need to use this syntax , but if we pass primitive types like interger ,boolean then simple follow above syntax 

// ----
// now we can also take input parameter as Type[] (type array )

function getSearchProducts<T>(products: T[]): T{ // we can also write like this (products: Array<T>) // also we can set return type as T[] but then we need to return array which is products
    // return 3  // this shows error that Type 'number' is not assignable to type 'T'. if we set return type as number then this is valid

    // As products is now array , so we return 
    return products[3] // this works because , the value you're taking is array of T types so the return value (here specified as T)  should be one of the value from that array 


} 

// console.log(getSearchProducts([1,2,3,4,5])) // 4 


//convert this function into arrow function 

const getMoreSearchProducts = <T>(products: T[]):T => {
    // do some database operation 
    const myIndex = 4
    
    return products[myIndex]
}

// also sometime developers write comman with generics like 
const getMoreSearchProducts1 = <T,>(products: T[]):T => { return products[3] } // this is to mention that this is not an ordinary tag like h1 tag or p tag . this is generic. like this is not jsx syntax but rather a syntax for generics 



// -----
// Using Type parameters in Generic Contraints
/* 
You can declare a type parameter that is constrained by another type parameter. For example, here we'd like to get a property from an object given its name. 
We'd like to ensure that we're not accidentally grabbing a property that does not exist on the obj. so we w'll place a constraint between the two types 
*/

function anotherFunction<T,U>(valOne:T,valTwo:U):object{

    return {
        valOne,
        valTwo

    }
}

// console.log(anotherFunction(3,"systumm")) //{valOne: 3, valTwo: 'systumm'}

// now there could be a situation where you can say U is going to extend the number  now it gives us a problem if we pass string value in U 

function anotherFunction2<T,U extends number>(valOne:T,valTwo:U):object{

    return {
        valOne,
        valTwo

    }
}
// console.log(anotherFunction2(3,"systumm")) // shows error Argument of type 'string' is not assignable to parameter of type 'number'
// console.log(anotherFunction2(3,4.6)) 

// real word scenario where this extents actually matters a lot 


interface Database {
    connection: string,
    username: string,
    password: string 
}

// now we want U could be anything but it should be type of database 
// anything could come up here or i want to define a generic which actualy extends database 
// by this way you are defining very generic but you are still restricting it that it should be a type of database

function anotherFunction3<T,U extends Database>(valOne:T,valTwo:U):object{

    return {
        valOne,
        valTwo

    }
}

console.log(anotherFunction3(4,{connection : "connectionstring",username : "anshgupta",password : "gupta"}))



// ----------------------------------------


// Using class Types in generics 

// we take example of selling a courses and quizzes so these are two sellable items that you can sell and you want to create a class in which there could be a quiz ,there could be a course and you want to create some methods which work for both of them because both of them are sellable 

interface Quiz{
    name: string,
    type: string
}

interface Course{
    name: string,
    author: string,
    subject: string
}

class Sellable<T> {
    public cart: T[] = []
    
    addToCart(product: T){
        this.cart.push(product)
    }
} // so this is generic class which can handle any type of object that you can pass it on and can do operations on that 

// Instead of writing separate classes like SellableCourse and SellableQuiz, you write one generic class that can handle both.

// When you create an instance of Sellable, you specify what type it will handle, for example:

const courseCart = new Sellable<Course>();
courseCart.addToCart({ name: "TS Basics", author: "Alice", subject: "Programming" });

console.log(courseCart.cart)  // this will return array of object

const quizCart = new Sellable<Quiz>();
quizCart.addToCart({ name: "TS Quiz", type: "Multiple Choice" });

console.log(quizCart.cart)

// This way, the Sellable class is reusable and type-safe for any kind of product.

