// Enums exists that there are certain times when you want to restring somebody's choice or the values that are offered here. 
// for eg. in ecommerce you want to restring order status, order can be in wishlist , or it can be delivered , it can be shipped , it can be returned
// for eg. in place booking there are only 3 types of seats which are regularly available like aisle , middle and window 

// const AISLE = 0
// const MIDDLE = 1
// const WINDOW = 2

// if(seat === 0){

// } // this is not good code . we can use enum in these type of situations


enum SeatChoice {
    AISLE,  // it shows (enum member) SeatChoice.AISLE = 0 // this is the default value given 0 to first one and then 1 to subsequent value and so on 
    MIDDLE, // (enum member) SeatChoice.MIDDLE = 1
    WINDOW  // (enum member) SeatChoice.WINDOW = 2
}


const hcSeat = SeatChoice.AISLE  // seatchoice.  we see only 3 options now 

// you can also change the value inside enum
enum SeatChoice1 {
    AISLE = 10,  // it shows (enum member) SeatChoice.AISLE = 10 // Now the value of this is 10  
    MIDDLE, // (enum member) SeatChoice.MIDDLE = 11
    WINDOW = 22 // (enum member) SeatChoice.WINDOW = 22 // we can also change its value 
}

// we can also give string value but then we need to give all some value otherwise it shows error

enum SeatChoice3 {
    AISLE = "aisle",  // (enum member) SeatChoice3.AISLE = "aisle"
    MIDDLE = "middle", // enum member) SeatChoice3.MIDDLE = "middle"
    WINDOW = 4 //(enum member) SeatChoice3.WINDOW = 4
}

const seat = SeatChoice3.AISLE 


// Note these SeatChoice are still type . so we can use it to define type of variables
enum SeatChoiceStr {
  AISLE = "aisle",
  MIDDLE = "middle",
  WINDOW = "window"
}

function printSeat(seat: SeatChoiceStr) {
  console.log(`Seat selected: ${seat}`);
}

printSeat(SeatChoiceStr.AISLE);  // "Seat selected: aisle"

enum SeatChoice4 {
  AISLE = 10,
  MIDDLE = 11,
  WINDOW = 12
}

function getSeatPrice(seat: SeatChoice4): number {
  switch(seat) {
    case SeatChoice4.AISLE:
      return 1000;
    case SeatChoice4.MIDDLE:
      return 800;
    case SeatChoice4.WINDOW:
      return 1200;
  }
}

console.log(getSeatPrice(SeatChoice4.WINDOW)); // 1200
