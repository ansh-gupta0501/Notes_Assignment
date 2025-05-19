const user = {
    username : "ansh gupta",
    welcome : function(){
        console.log(`${this.username}`)   
        console.log(this)  
        /*  ansh gupta
            { username: 'ansh gupta', welcome: [Function: welcome] }
            gupta
            { username: 'gupta', welcome: [Function: welcome] }

            we see that (this) keyword gives us current context , 
        */ 
    }
}

// user.welcome()

// user.username = "gupta"

// user.welcome()

//so this refers to current context , which means current values  we are dealing with . as we change the context later (username) so this now refers to that context 

// if we simple print this in node environment , we see empty object because there is no any context in global 
// but in browser , this keyword denotes window as global object 

// console.log(this)  //{} 

//now printing (this) inside normal functions 

// function one()
// {
//     console.log(this)     // in this situation , we get many values like global , setImmediate , setInterval , setTimeout any many values 
// }

// one()

// function one()
// {
//     let username = "ansh gupta "
//     console.log(this.username)      
// }

// one()      // undefined :- so this context works in objects , not in functions 

// const one = ()=>{
//     let username = "ansh gupta"
//     // console.log(this)                 // {}
//     console.log(this.username)          //undefined
// }

// one()
