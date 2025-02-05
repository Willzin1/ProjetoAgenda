exports.middlewareGlobal = (requisicao, response, next) => {
    response.locals.errors = requisicao.flash('errors');
    response.locals.success = requisicao.flash('success');
    response.locals.user = requisicao.session.user;
    next();
}

exports.checkCsrfError = (err, requisicao, response, next) => {
    if (err) response.render('404');

    next();
}

exports.csrfMiddleware = (requisicao, response, next) => {
    response.locals.csrfToken = requisicao.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'É necessário estar logado.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    
    next();
}