const express = require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3002;


const app = express();

// view engine setup
app.set('views', './source/template');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.get('/', function (req, res) {

});


app.post('/', function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.message) {
        res.send('Не все поля заполнены');
    } else {
        res.send('Получилось');
    }
    return res.json({ msg: 'Все поля нужно заполнить!', status: 'Error' });
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
