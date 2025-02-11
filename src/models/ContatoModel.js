const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Login'}
})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true});
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id})
    return contato;
}

Contato.buscaContatos = async function(id) {
    const contatos = await ContatoModel.find({ userId: id })
        .sort({criadoEm: -1}); // -1 é ordem decrescente, 1 é ordem crescente
    return contatos;
}

Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;

    const contato = await ContatoModel.findById(id);
    return contato;
}

Contato.prototype.register = async function(userId) {
    this.valida();

    if(this.errors.length > 0) return;
    this.body.userId = userId;
    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function() {
    this.cleanUp();
            
    // Validar email
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido'); 
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato deverá ser enviado: e-mail ou telefone.');
}

Contato.prototype.cleanUp = function() {
    for (let key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }else {
            this.body[key] = this.body[key].trim();
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
        userId: this.body.userId
    }
}

module.exports = Contato;
