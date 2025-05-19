//append text to an existing file 

const fs = require('fs');
const data = "\nnew text added using callback approach "

fs.appendFile('task1.txt', data, (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Text appended successfully!');
});


//another method using promises (async/await)

const fs1 = require('fs').promises;
const data1 = '\n new text added using promises'
async function append() {
    try {
        await fs1.appendFile('task1.txt', data1);
        console.log('Text appended successfully!');
    } catch (err) {
        console.error('Error appending to file:', err);
    }
}

append();
