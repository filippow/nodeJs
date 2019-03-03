const fs = require('fs'),
    path = require('path'),
    moveToTargetFolder = require('./moveToTargetFolder');

/**
 * Рекурсивный поиск файлов в исходной папке
 * @param directoryName
 */
const recursiveSearch = function (directoryName) {
    let children = fs.readdirSync(directoryName),
        promises = [];

    children.forEach((item) => {
        let childPath = path.join(directoryName, item);

        if (fs.statSync(childPath).isDirectory()) {
            promises.push(recursiveSearch(childPath));
        } else {
            promises.push(moveToTargetFolder(childPath));
        }
    });

    return Promise.all(promises);
};

module.exports = recursiveSearch;