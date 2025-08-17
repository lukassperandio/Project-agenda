const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if(req.session.user) return res.render('login-logado');
  return res.render('login');
};


exports.register = async (req, res) => {
  try{
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      return res.render('login', {
        errors: login.errors,
        csrfToken: req.csrfToken()
      });
    }

    req.flash('success', 'Seu usuário foi criado com sucesso');
    req.session.save(function() {
      return res.redirect('/login/index');
    });
  }catch(e){
    console.log(e);
    return res.render('404');
  }
};

exports.login = async (req, res) => {
  try{
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      return res.render('login', {
        errors: login.errors,
        csrfToken: req.csrfToken()
      });
    }

    req.flash('success', 'Login realizado com sucesso');
    req.session.user = login.user;
    req.session.save(function() {
      return res.redirect('/login/index');
    });
  }catch(e){
    console.log(e);
    return res.render('404');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Erro ao destruir a sessão:', err);
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    return res.redirect('/login/index'); // redireciona para a tela de login
  });
};

