const express = require('express');
const app = express();
const PORT = 4000;

const logger = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));