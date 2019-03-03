const fs = require('fs'),
    config = require('./config'),
    recursiveSearch = require('./recursiveSearch');

/**
 * Реализация с вводом только названия корневой папки для исходной и итоговой папок
 */
const sourceFolderName = config.sourceFolderName,
    targetFolderName = config.targetFolderName,
    rootFolderPath = config.rootFolderPath;

/**
 * Функция запускающая процедуру перемещения и удаления
 * @returns {Promise<any>}
 */
function startMovement() {
    return new Promise((resolve, reject) => {
        try {
            let files = fs.readdirSync(rootFolderPath);

            if (files && files.indexOf(sourceFolderName) > -1) {
                fs.mkdirSync(targetFolderName);
                recursiveSearch(sourceFolderName).then(resolve, reject);
            }
        } catch (err) {
            console.log(err);
            reject();
        }
    })
}

startMovement().then(() => {
    console.log('Movement Finished');
});