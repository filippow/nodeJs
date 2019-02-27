const fs = require('fs'),
    path = require('path'),
    sourceFolderName = require('./config').sourceFolderName;

/**
 * Функция удаляющая пустые папки. По умолчанию используется исходная папка.
 *
 * @param pathToDeleteFolder
 */
const deleteFolder = function (pathToDeleteFolder = sourceFolderName) {
    console.log(pathToDeleteFolder);
    fs.readdir(pathToDeleteFolder, (err, files) => {
        if (err) return;

        //Если в текущей папке есть содержимое, то применяем рекурсивное удаление к каждому элементу внутри
        if (files.length) {
            files.forEach(item => {
                deleteFolder(path.join(pathToDeleteFolder, item));
            })
        } else {
            //Случай когда в текущей папке для удаления нет дочерних папок или файлов
            // Перед удалением проверяем, что текущий путь это путь к папке.
            fs.stat(pathToDeleteFolder, (err, stats) => {
                if (err || !stats.isDirectory()) return;

                fs.rmdir(pathToDeleteFolder, err => {
                    if (err) return;

                    //Случай когда родительская папка иявляеся исходной, обрабатываем отдельно и выходим из рекурсии
                    if (path.dirname(pathToDeleteFolder) === sourceFolderName) {
                        fs.rmdir(sourceFolderName, err => {})
                    } else {
                        deleteFolder(path.dirname(pathToDeleteFolder))
                    }
                })
            })
        }
    })
};

module.exports = deleteFolder;