// // const {sayHallo} = require('./header')
// // sayHallo();
// const os = require('os');
//
// console.log(os.arch());
// console.log(os.cpus());
const fs = require('fs');
const path = require('path');

// Створюємо основну папку
const mainFolder = 'myFolder';
if (!fs.existsSync(mainFolder)) {
    fs.mkdirSync(mainFolder);
}

// Створюємо 5 папок та 5 файлів в основній папці
for (let i = 1; i <= 5; i++) {
    const folderName = path.join(mainFolder, `folder${i}`);
    const fileName = path.join(mainFolder, `file${i}.txt`);

    // Створюємо папку
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
        console.log(`FOLDER: ${folderName}`);
    }

    // Створюємо файл
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, 'This is a sample file content.');
        console.log(`FILE: ${fileName}`);
    }
}
