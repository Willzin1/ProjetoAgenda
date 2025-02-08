const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcrypt');

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = []; // <- Irá controlar se não há erros no preenchimento do formulário
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('Email ou senha inválidos.');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Email ou senha inválidos.');
            this.user = null;
            return;
        }

    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        
        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(this.user) this.errors.push('Usuário já existe.');
    }

    valida() {
        this.cleanUp();
        
        // Validar email
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido');
        }
        
        // Validar senha
        if(this.body.password.length < 8 || this.body.password.length > 50) this.errors.push('Senha precisa ter entre 8 e 50 caractéres.');

    }

    cleanUp() {
        for (let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login;