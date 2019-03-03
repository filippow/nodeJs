const fs = require('fs'),
    path = require('path'),
    deleteFolder = require('./deleteFolder'),
    targetFolderName = require('./config').targetFolderName,
    isDelete = require('./config').isDelete;

/**
 * Функция перемещающая файл в итоговую папку. Предварительно создает директорию (если не создана) в соответствии с первой буквой файла
 * Промис резолвится после успешного перемещения файла. В случае если необходимо удалять исходну папку,
 * то после удаления доступных директорий в дереве исходной папки
 * @param filePath
 */
const moveToTargetFolder = function (filePath) {
    return new Promise((resolve, reject) => {
            let subFolderName = path.basename(filePath)[0].toUpperCase(),
                targetDirectory = path.join(targetFolderName, subFolderName),
                fileName = path.basename(filePath),
                readStream,
                writeStream;

            if (fs.readdirSync(targetFolderName).indexOf(subFolderName) === -1) {
                fs.mkdirSync(path.join(targetDirectory));
            }
            readStream = fs.createReadStream(filePath);
            writeStream = fs.createWriteStream(path.join(targetDirectory, fileName));
            readStream.on('error', err => {
                reject();
            });
            writeStream.on('error', err => {
                reject()
            });
            readStream.on('close', err => {
                if (err) {
                    reject();
                    return;
                }
                if (isDelete) {
                    fs.unlinkSync(filePath);
                    deleteFolder().then(resolve);
                } else {
                    resolve();
                }
            });
            readStream.pipe(writeStream);
        }
    )
};

module.exports = moveToTargetFolder;