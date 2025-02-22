require('dotenv').config();

const express = require('express');
const app = express();

// Mongoose irá modelar nossos dados no banco de dados, para garantir como eles serão enviados.
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto');
    })
    .catch(err => console.log(err));

// Para garantirmos sessões.
const session = require('express-session');

// Para dizermos que as sessões serão salvas na base de dados.
const MongoStore = require('connect-mongo');

// Para garantirmos mensagens de flash, geralmente aquelas de erro de login
const flash = require('connect-flash');

// Rotas
const routes = require('./routes');

// Path para consertar o caminho
const path = require('path');

// Medidas de seguranças
const csrf = require('csurf');

// Nossos middlewares
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static(path.resolve(__dirname, 'public'))); 

// Configurações das sessões.
const sessionOptions = session({
    secret: 'TEXTO QUE NGM VAI SABER',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, 
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); 
app.set('view engine', 'ejs'); 

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(process.env.DB_PORT);
})
