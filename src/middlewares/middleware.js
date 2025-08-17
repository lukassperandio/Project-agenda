exports.middlewareGlobal = (req, res, next) => {
  res.locals.umaVariavelLocal = ''
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next();
};

exports.checkCsrfError = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};