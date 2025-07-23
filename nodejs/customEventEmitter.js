// here creating our custom event emitter class 

const EventEmitter = require('node:events')
const DrinkMachine = require('./drink-machine')
class PizzaShop extends EventEmitter {
    constructor(){
        super();
        this.orderNumber = 0;
    }

    order(size,topping){
        this.orderNumber++;
        this.emit('order',size,topping) // this keyword refers to emitter object 
    }

    displayOrderNumber(){
        console.log(`current order number: ${this.orderNumber}`)
    }
}


const pizzaShop = new PizzaShop()
const drinkMachine = new DrinkMachine()

pizzaShop.on('order',(size,topping)=>{
   console.log(`Order recieived! baking a ${size} pizza with ${topping} `);
   drinkMachine.serveDrink(size)
})



pizzaShop.order('large','mushroom')
pizzaShop.displayOrderNumber()