// // intefaces and classes 

// // scenerio:- we are building a mobile app which uses the camera just and want to implement that kind of a scenario in our application 

// interface TakePhoto{
//     cameraMode : string // may be a frontend camera or backcamera but whoever is designing a class that you can take a photo from you web application should always implement this 
//     filter: string 
//     burst: number 
// }


// interface Story{
//     createStory(): void
// }


// //this is interface . now in your entire application no matter how or who is building it if anybody wants to create a feature of taking photos should always and always follow this interface
// // so let say an application comes up and it's an open source project and somebody is building a fictitious instagram

// class Instagram implements TakePhoto{ // if we are implementing interface then the interface properties must be defined in the class
//     constructor(
//         public cameraMode: string,
//         public filter: string,
//         public burst: number
//     ){}    // now you can define these properties according to your need 

// }

// class Youtube implements TakePhoto,Story{
//     constructor(
//         public cameraMode: string,
//         public filter: string,
//         public burst: number,

//         // but in youtube i want to add more properties so we can add 
//         public short: string 

//     ){} 

//     // now we must define the createStory method as it is defined in Story interface
//     createStory(): void {
//         console.log("story created ");
        
//     }
  
// }


