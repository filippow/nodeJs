const fs = require('fs'),
    path = require('path'),
    moveToTargetFolder = require('./moveToTargetFolder');

/**
 * Рекурсивный поиск файлов в исходной папке
 * @param directoryName
 */
const recursiveSearch = function (directoryName) {
    fs.readdir(directoryName, (err, files) => {
        if (err) return;

        files.forEach(item => {
            let childPath = path.join(directoryName, item);

            fs.stat(childPath, (err, stats) => {
                if (err) return;

                if (stats.isDirectory()) {
                    recursiveSearch(childPath);
                } else {
                    moveToTargetFolder(childPath);
                }
            })
        })
    })
};

module.exports = recursiveSearch;
