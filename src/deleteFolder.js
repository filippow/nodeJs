const fs = require('fs'),
    path = require('path'),
    sourceFolderName = require('./config').sourceFolderName;

/**
 * Функция удаляющая пустые папки. Точкой входа по умолчанию используется исходная папка.
 * @param pathToDeleteFolder
 */
const deleteFolder = function (pathToDeleteFolder = sourceFolderName) {
    let promises = [],
        files;

    // Проверяем, что текущий переданный путь это путь к папке
    if (fs.statSync(pathToDeleteFolder).isDirectory()) {
        files = fs.readdirSync(pathToDeleteFolder);
    }

    // Слуйчай когда переданный путь - не папка. Возвращаем промис в резолве
    if (!files) {
        return Promise.resolve();
    }

    // Если в текущей директории содержатся другие папки, то пытаемся их удалить
    if (files.length) {
        files.forEach(file => {
            promises.push(deleteFolder(path.join(pathToDeleteFolder, file)));
        });
    } else {
            fs.rmdirSync(pathToDeleteFolder);

            // Случай с удалением исходной папки обрабатываем отдельно и выходим из рекурсии
            // Если папка не исходная то пытаемся удалить родительскую
            if (path.dirname(pathToDeleteFolder) === sourceFolderName) {
                if (fs.readdirSync(sourceFolderName).length === 0) {
                    fs.rmdirSync(sourceFolderName);
                }
            } else {
                promises.push(deleteFolder(path.dirname(pathToDeleteFolder)));
            }
    }

    return Promise.all(promises);
};

module.exports = deleteFolder;