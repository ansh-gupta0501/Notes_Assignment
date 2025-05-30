Closures

A closure is the combination of a function bundled together (enclosed) with reference to its surrounding state(the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function. In javascript, closures are created every time a function is created, at function creation time. 

function init(){
 var name = 'Mozilla'; // name is a local variable created by init
 function displayName(){
  //displayName() is the inner function, a closure
   
  console.log(name); // use variable declared in the parent function
 }
 displayName();
}

init();

// output of this program will be Mozilla 

how it is beneficial , instead of calling displayName() function inside init, return this function 


function init(){
 var name = 'Mozilla';  

 function displayName(){
  
   
  console.log(name);  
 }
  return displayName;
}

// init(); // this will not print anything 

// but if we do like this 

let fn = init(); // init function call returns a function and when we call that fn function we get output 

fn();     // output - 'Mozilla'



// now making more changes passing argument


function init(name){


 function displayName(){
  
   
  console.log(name);  
 }
  return displayName;
}

let fn = init('ansh Gupta')
fn()

so basically we are creating a function from another function 

------------------------------
Practical Examples

function adder(num){
 function add(b){
  console.log(num + b);
 }
return add;
}

const addTo5 = adder(5)
const addTo10 = adder(10)

addTo5(2);    // now this always add 5 to the function //output 7
addTo5(10);   // output 15

addTo10(2)

so technically i have made an utility function which always add to 5 

// practical use case 

//html code 

<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<p id='my-name' style = 'font-size : 100px'> ansh gupta</p>
<button id = 'change-size'>
click me 
</button>
</body>
</html>

// javascript code 

const myname = document.getElementById('my-name')
const btn = document.getElementById('change-size')

function makeTextSizer(size){
 function changeSize(){
 console.log("changing font size ");
  myname.style.fontSize = `${size}px`;
 }
 return changeSize;
}

const size20= makeTextSizer(20);

btn.addEventListener('click',size20)                  

//when we click on a button , the size changes to 20px 

//benefits :- 
- You can now reuse the function to create customized behaviors — maybe one button sets 20px and another 30px. The function makeTextSizer produces new functions that "remember" the size you passed in. 
- Data Encapsulation :- Closures can hide state. You can store values in a closure without exposing them globally:
function fontSizeController(initialSize) {
  let size = initialSize;
  return {
    increase: () => {
      size += 2;
      myname.style.fontSize = `${size}px`;
    },
    decrease: () => {
      size -= 2;
      myname.style.fontSize = `${size}px`;
    }
  };
}

const controller = fontSizeController(14);
btn.addEventListener('click', controller.increase);
Here, size is a private variable that persists between calls. This isn't easily doable without closures.

4. Functional Programming Style
Closures are a key feature of functional programming. They let you treat functions as configurable objects. It's not always necessary, but it's clean and powerful for building modular, reusable components.

--------------
another example where closure fails 

you want to count how many times each button is clicked, but without using any global variables.

Without Closure (Messy with global state)

let clickCount = 0;

button.addEventListener('click', function() {
  clickCount++;
  console.log(`Clicked ${clickCount} times`);
});


With Closure (Clean and Scalable)

function makeClickCounter(buttonId) {
  let count = 0; // private state

  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    count++;
    console.log(`Button ${buttonId} clicked ${count} times`);
  });
}

// Create independent counters
makeClickCounter('btn1');
makeClickCounter('btn2');


---------------------------------------------------------

another example 

html code 

<html>
<head>
<title>Page Title</title>
</head>
<body>

<button id = 'red'>
red
</button>

<button id = 'orange'>
orange
</button>

</body>
</html>       

javascript code 

const orange = document.getElementById('orange')
const red = document.getElementById('red')


function clickHandler(color){
 document.body.style.backgroundColor  = `${color}`
}

orange.onclick = clickHandler('orange')
/* red.onclick = clickHandler('red') */                            without clicking on button , the body color automatically changes to orange which is an error 

// so do by closure by either of the method 

const orange = document.getElementById('orange')
const red = document.getElementById('red')


function clickHandler(color){

 function changeColor(){
 		const secretcolor = color
    document.body.style.backgroundColor  = `${secretcolor}`;
 }
 return changeColor;
}

const orangecolor = clickHandler('orange');
const redcolor = clickHandler('red');
orange.addEventListener('click',orangecolor)
red.addEventListener('click',redcolor) 

// another method 

const orange = document.getElementById('orange')
const red = document.getElementById('red')


function clickHandler(color){

 function changeColor(){
 		const secretcolor = color
    document.body.style.backgroundColor  = `${secretcolor}`;
 }
 return changeColor;
}

const orangecolor = clickHandler('orange');
const redcolor = clickHandler('red')
orange.onclick = orangecolor
red.onclick = redcolor