// // const {sayHallo} = require('./header')
// // sayHallo();
// const os = require('os');
//
// console.log(os.arch());
// console.log(os.cpus());




const fs = require('fs');
const path = require('path');


const mainFolder = 'myFolder';
if (!fs.existsSync(mainFolder)) {
    fs.mkdirSync(mainFolder);
}


for (let i = 1; i <= 5; i++) {
    const folderName = path.join(mainFolder, `folder${i}`);
    const fileName = path.join(mainFolder, `file${i}.txt`);


    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        console.log(`FOLDER: ${folderName}`);
    }

    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, 'This is a sample file content.');
        console.log(`FILE: ${fileName}`);
    }
}
