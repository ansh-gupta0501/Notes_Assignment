const {Readable} = require("stream")

class CustomReadableStream extends Readable{
    constructor(options){
        super(options)

        this.maxNumber = 10;
        this.generatedNumbers = 0;
    }

    _read(){
        if(this.generatedNumbers>= this.maxNumber){
            this.push(null)
        }
        else{
            const randomNumber = Math.floor(Math.random()*1000)
            const buffer = Buffer.from(randomNumber.toString(),'utf-8')
            this.push(buffer)
            this.generatedNumbers += 1;
        }
    }

}

const randomNumbersStream = new CustomReadableStream()

randomNumbersStream.on("data",(chunk)=>{
    console.log("recieved :",chunk.toString())
})

randomNumbersStream.on('end',()=>{
    console.log("Finished reading the numbers ")
});