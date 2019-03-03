const path = require('path'),
    args = process.argv.slice(2);

/**
 * Список используемых параметров
 * 1) Название исходной папки с вложенной структурой и файлами
 * 2) Название итоговой папки
 * 3) Флаг, показывющий необходимость удаления исходной папки
 * 4) Путь к коревой директории проекта
 */
module.exports = {
    sourceFolderName: args[0] || 'source',
    targetFolderName: args[1] || 'target',
    isDelete: args[2] || false,
    rootFolderPath: path.dirname(path.join(__dirname))
};