// Para salvarmos variaveis de ambientes, não subiremos em nosso repositorio.
require('dotenv').config();

// Requirindo o express.
const express = require('express');
const app = express();

// Mongoose irá modelar nossos dados no banco de dados, para garantir como eles serão enviados.
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('conectei na base')
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
const routes = require('./routes')
// Path para consertar as barras /\ 
const path = require('path');

// Medidas de seguranças
const helmet = require('helmet');
const csrf = require('csurf'); // cria um token para todos os formulários, afim de evitar ataques.

// Nossos middlewares, são funções que são executadas na rota
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet()); // usando o helmet

app.use(express.urlencoded({ extended: true })); // Este middleware será útil para processar os dados de formulários enviados, permitindo acessá-los via req.body na sua rota.
app.use(express.json()); // é usado para garantir que o Express consiga interpretar requisições com o conteúdo no formato JSON de maneira simples e automática.

app.use(express.static(path.resolve(__dirname, 'public'))); // são todos os arquivos estáticos da nossa aplicação, exemplo são imagens, css, javascript.

// Configurações das sessões.
const sessionOptions = session({
    secret: 'TEXTO QUE NGM VAI SABER',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // Pegar o tempo que ficará salvo em cookies, (7 dias)
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // setando as views
app.set('view engine', 'ejs'); // setando a engine que renderizará as views.

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3443, () => {
        console.log('SERVIDOR EXECUTANDO NA PORTA: 3443');
    });
})


