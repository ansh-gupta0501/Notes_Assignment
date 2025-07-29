// versioning

// npm install always install latest version of package 
// but we can also specify the version number during installation of package using npm install uppper-case@2.0.0 


// Semantic versioning 

// npm adops semsntic versioning 
// it is one of most widely adopted versioning systems
// A simple set of rules and requirements that dictate how version numbers are assigned and incremented
// It is crucial to keep a semantic and historical track of changes
// Version numbers and the way they change convey meaning about the underlying code and what has been modified from one version to the next 


// How it works 
// format of semantic version :- x.y.z

// Here x stand for major version 
// y stands for minor version 
// z stands for patch version 

// For eg., 2.0.2 

// patch version :- when you fix a bug and the code stays backwards-compatible you increment the patch version . For eg,. 1.1.1 to 1.1.2
// minor version :- When you add new functionality but the code still stays backwards-compatible, you increment the minor version. You also reset the patch version to zero . For eg,. 1.1.1 to 1.2.0
// major version :- When you make changes and the code is no more backwards compatible, you increment the major version . You have to reset the minor and patch version to zero . For eg,. 1.1.1 to 2.0.0


// Few more points 
// Semantic versioning always starts with 0.1.0 
// 0.y.z(a major version of zero ) is used for initial development 
// when the code is production-ready , you increment to version 1.0.0
// Even the simplest of changes has to be done with an increase in the version number 


