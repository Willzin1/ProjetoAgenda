const Contato = require('./../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', { contato: {}});
};

exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register(req.session.user._id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        };

        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => res.redirect('/agenda'));
        return;
    } catch(err) {
        console.log(err);
        res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('404');

    res.render('contato', { contato });
}

exports.edit = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato/index'));
        return;
        };

        req.flash('success', 'Contato alterado com sucesso.');
        req.session.save(() => res.redirect('/agenda'));
        return;
    }catch(err) {
        console.log(err);
        res.render('404');
    }
};

exports.delete = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const contato = await Contato.delete(req.params.id);
        if(!contato) return res.render('404');

        req.flash('success', 'Contato deletado com sucesso.');
        req.session.save(() => res.redirect('/agenda'));
        return;
    } catch (err) {
        console.log(err);
        res.render('404');
    }
};