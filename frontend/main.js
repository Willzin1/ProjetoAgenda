import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/CSS/style.css';
import Login from './modules/Login';
import Contato from './modules/Contato';

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
const contato = new Contato('.form-contato');

cadastro.init();
login.init();
contato.init();