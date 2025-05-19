//read a file and log its content 


const fs = require('fs');

fs.readFile('task1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content:\n", data);
});



//another method using promises async/await 

const fs1 = require('fs').promises;

async function readFile() {
    try {
        const data = await fs1.readFile('task1.txt', 'utf8');
        console.log("File content:\n", data);
    } catch (err) {
        console.error("Error reading file:", err);
    }
}

readFile();
