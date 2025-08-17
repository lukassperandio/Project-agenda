const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  res.render('login', {
    errors: req.flash('errors')
  });
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