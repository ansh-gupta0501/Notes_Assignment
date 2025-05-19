//recursively list files in a directory 

const { log } = require('console');
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
            else if(ele.isFile()&&ele.name.endsWith(".txt")){
                console.log(ele.name);
            }

 
        })

    });
}

// Usage
listFilesRecursively("C:/Users/ansh.gupta/Documents/Work/Assignments");
