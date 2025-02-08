const Contato = require('./../models/ContatoModel');

exports.index = async (requisicao, resposta) => {   
    resposta.render('index');
}

exports.agenda = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('agenda', { contatos });
}