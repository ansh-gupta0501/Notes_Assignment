// Binary Data 
// Computer store and represent data in binary format which is a collection of 0s and 1s
// Each 0 or 1 is called a binary digit or bit for short 
// To work with a piece of data , a computer need to convert that data into its binary representation 


// number can easily be converted to binary format 

// but to convert character in binary format ??

// eg. V? 
// computers will first convert the character to a number , then convert that number to its binary representation 
// computers will first convert V to a number that represents V 


console.log("V".charCodeAt())  // 86 // Unicode code 

// it is also called character code 


//How does the computer know V should be represented as 86 ? Using Character Sets 

// Character Sets 

// Character sets are predefined lists of characters represented by numbers 
// Popular character sets - Unicode and ASCII

// Unicode character set dictates that 86 should represent character V 

// it is not completely true that now computer now can  convert this 86 into binary . It is not
// It is done by character encoding 

// Character Encoding 

// It dictates how to represent a number in a character set as binary data before it can be stored in a computer 
// It dictates how many bits to use to represent the number 
//eg. of a character encoding system is UTF-8

// UTF-8 states that character should be encoded in bytes (8 bits) means Eight 1s or 0s should be used to represent the code of any character in binary 
// 4 -> 100 -> 00000100 (make it utf-8)
// V -> 86 -> 01010110

//similar guidelines also exist on how images and videos should be encoded and stored in binary format 

