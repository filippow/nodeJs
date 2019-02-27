const fs = require('fs'),
    path = require('path'),
    deleteFolder = require('./deleteFolder'),
    targetFolderName = require('./config').targetFolderName,
    isDelete = require('./config').isDelete;

/**
 * Функция перемещающая файл в итоговую папку. Предварительно создает директорию (если не создана) в соответствии с первой буквой файла
 * @param filePath
 */
const moveToTargetFolder = function (filePath) {
    let subFolderName = path.basename(filePath)[0].toUpperCase();

    fs.readdir(targetFolderName, (err, files) => {
        if (err) return;

        let targetDirectory = path.join(targetFolderName, subFolderName);

        if (files.indexOf(subFolderName) === -1) {
            fs.mkdir(targetDirectory, err => {
                if (err) return;
                moveFile(filePath, targetDirectory);
            });
        } else {
            moveFile(filePath, targetDirectory);
        }

    })
};

/**
 * Создание потока для перемещения файла. Если при вводе команды скрипта был передан флаг на удаление, то выполняем рекурсивное удаление
 * @param sourcePath
 * @param targetDirectory
 */
function moveFile(sourcePath, targetDirectory) {
    let fileName = path.basename(sourcePath),
        readStream = fs.createReadStream(sourcePath),
        writeStream = fs.createWriteStream(path.join(targetDirectory, fileName));

    readStream.on('error', err => {});
    writeStream.on('error', err => {});

    if (isDelete) {
        readStream.on('close', (err) => {
            if (err) return;

            fs.unlink(sourcePath, err => {
                if (err) return;

                deleteFolder();
            });
        });
    }

    readStream.pipe(writeStream);
}

module.exports = moveToTargetFolder;