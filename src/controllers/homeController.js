const Contato = require('./../models/ContatoModel');

exports.index = async (requisicao, resposta) => {
    const contatos = await Contato.buscaContatos();    
    resposta.render('index', { contatos });
}
