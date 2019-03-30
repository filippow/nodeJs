const express = require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3002;


const app = express();

// view engine setup
app.set('views', './source/template');
app.set('view engine', 'pug');

// Start using middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use('/', require('./routes/index'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
