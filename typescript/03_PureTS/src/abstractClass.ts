// class TakePhoto {
//     constructor(
//         public cameraMode: string,
//         public filter: string
//     ){}

// }

// const ag = new TakePhoto("test","Test")

// this is ok 

// now if we make abstract class 

abstract class TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string
    ){}

    // getSepia(): void // this give error Function implementation is missing or not immediately following the declaration
    // this can be solved by making this method abstract

    abstract getSepia(): void
    // by this we are telling that this is abstract method I am not going to provide you defination 

     getReelTime(): number{
        //some complex calcualtions
        return 8;
    } // this does not give any problem if we provide defination of the method in abstract class 
}

// const ag = new TakePhoto("test","Test") // give error Cannot create an instance of an abstract class. means no new objects can be created from this 

// abstract classes are the blueprint you cannot create an object from it . It is the responsiblity of the class who is extending it 
// and it is must to define the abstract method in the child class otherwise it will give error

class Instagram extends TakePhoto{
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number  // adding more functionality to the Instagram class 

    ){
        super(cameraMode,filter)  // need to call super with the parent class constructor parameters 
    }

    getSepia(): void {
        console.log("sepia")
    }

   
}


const ag = new Instagram("test","Test",3) // now this works fine 
ag.getReelTime() // this works fine


// 3:35