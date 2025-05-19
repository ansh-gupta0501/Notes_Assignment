//implement a closure to create a counter function 

// function counter(){
//     let count = 1;
//     function increment(){
//        console.log("count is ",count++);
//     }

//     return increment;
// }

// const ans = counter();
// ans()
// ans()
// ans()
// ans()

var a = 10;
//var a;

function foo() {
    console.log(a);
   var a = 20;
  
}

foo();