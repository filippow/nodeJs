const fs = require('fs'),
    config = require('./config'),
    recursiveSearch = require('./recursiveSearch');

/**
 * Реализация с вводом только названия корневой папки для исходной и итоговой папок
 */
const sourceFolderName = config.sourceFolderName,
    targetFolderName = config.targetFolderName,
    rootFolderPath = config.rootFolderPath;


//Проверка наличия исходной папки
fs.readdir(rootFolderPath, (err, files) => {
    if (err || files.indexOf(sourceFolderName) === -1) {
        console.log('Путь к исходной папке указан неверно');
        return
    }
    //Содание итоговой папки
    fs.mkdir(targetFolderName, {recursive: true} ,err => {
        if (err) return;

        recursiveSearch(sourceFolderName);
    })
});


