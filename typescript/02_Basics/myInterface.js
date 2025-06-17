// interaces are similar to "types"
/*
interface is more like a scenario. Interface doesn't have those nitty-gritty and details of how it will work
but like when you are creating a user these are field which are compulsory, these are the method which are compulsory
interface is loose form of class , very broad overview. it will force you that there should be a method the name should be same but
it does not say what should you do inside it just has a basic protocol
*/
var ansh = { dbId: 22, email: "ansh@gmail.com", userId: 2221,
    startTrial: function () {
        return "trial started";
        // return 1 // show error Type '() => number' is not assignable to type '() => string'.Type 'number' is not assignable to type 'string'.
    },
    getCoupon: function (name, off) {
        return 10;
    }
}; // we need to provide all the details including the method we define above 
