# Typescript 

## Types

- Number 
- String 
- Boolean
--- These 3 are primitive types 
- Null
- Undefined
- Void
- Object
- Array
- Tuples
- **Any**  keyword make our code more vulnerable or more like javascriptish so that we don't have to worry about the types 
- Never
- unknown

**There is nothing int or float. Everthing is just Number**
### Situations :- At what situations typescript serves best

- A function accepts two numbers. In javascript , what happens when function accepts two numbers, then you check the type of these values and you want to be make sure that these are actually number because i want to perform some operations on that. What typescript helps you out , you don't have to explicit check that if the function which is acceptiong and what is coming as a datda is it really number is it my it might be a string or it might be a void or nothing might be coming in so typescript allows you to get away from the situation so the extra line of code you don't have to write 

- Similar situation is function returns a string so the situation that comes in javascript that suppose you're using a function and you're expecting that the data coming out of that function is a string but that might not be the case . maybe some other programmer has written this and he might have thrown out a number and that could be a problematic situation.

### Syntax

- **let variableName: type = value**     --- we can also use keyword const instead of let for declaring a variable. after : you need to define its type.
- All the types in typescript are lowercase ,there is no uppercase. so numbers ,string whatever you want to name or put a data type on it then all it's a lowercase then optionally you can pass on a value or can just declare a variable

- understand more in variableMe.ts file