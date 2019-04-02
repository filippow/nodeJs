const low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    path = require('path'),
    adapter = new FileSync(path.join(__dirname, 'database.json')),
    db = low(adapter);

db.defaults({
    products: [],
    skills: {},
    users: {
        admin: {
            id: 1,
            email: 'filippow.ewgen@yandex.ru',
            password: 'q1'
        },
        usual: []
    }
}).write();

module.exports = db;