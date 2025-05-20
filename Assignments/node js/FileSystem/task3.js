//recursively list files in a directory 


const fs = require('fs');
const path = require('path');

function listFilesRecursively(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        entries.forEach((ele)=>{
            if(ele.isDirectory()){
                listFilesRecursively(path.join(dir,ele.name));
            }
            else if(ele.isFile()){
                console.log(ele.name);
            }

 
        })

    });
}


listFilesRecursively("C:/Users/ansh.gupta/Documents/Work/Assignments");  // don't use path like \Users because javascript understands \c with  some predefined functions like \n \t etc. 
