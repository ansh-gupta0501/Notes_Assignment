// const superHeros = []  // it shows it is of type never . const superHeros: never[]

// superHeros.push("spiderman") // it shows error Argument of type '"spiderman"' is not assignable to parameter of type 'never'.

// never is something which is supposed to never execute or end the things.

// const superheros: [] = [] // now it shows its type as array (const superheros: []). But it is a type of empty array always
// superheros.push("spiderman") // but it again shows error Argument of type '"spiderman"' is not assignable to parameter of type 'never'

// so to define , we need to tell which type of data comes in this array 

const superHeros: string[] = [] // not it shows its type as string array const (superHeros: string[])
superHeros.push("spiderman")

const heroPower: number[] = []

heroPower.push(2) 

// ---------------------
// another way to define array 

const heroPower2: Array<number> = []

// ---------------------------------------------

type User = {
    name : string
    isActive: boolean
}

const allUsers: User[] = []   // we define allUsers as User array 
// allUsers.push("") // this will give error Argument of type 'string' is not assignable to parameter of type 'User'

// allUsers.push({}) // this will also give error if we pass empty object Argument of type '{}' is not assignable to parameter of type 'User'.

allUsers.push({name: "",isActive: true}) // correct , we can pass empty name 


// --------------------------------------------

const MLModels: number[][] = [     // we define array inside array like 2d array 
    [255,255,255],
    // ""                 //shows error as can't assign string to number[]
    []

]


// ----------------------------------------

// ReadOnly Array :- it is special type that describes arrays that shouldn't be changed 

function doStuff(values: ReadonlyArray<string>){
    // we can read from 'values'
    const copy = values.slice();  // we can use array methods
    console.log(`The first value is ${values[0]}`) 

    // but we can't mutate values
    //values.push("hello" ) // shows error Property 'push' does not exist on type 'readonly string[]'
}


export {}