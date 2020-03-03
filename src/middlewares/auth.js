const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).send({ error: 'Sem token' });
  };

  const parts = authHeader.split(' ');

  if(!parts.length === 2) {
    return res.status(401).send({ error: 'Problema no token'});
  }

  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Formato de token inválido' })
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) {
      return res.status(401).send({ error: 'Token inválido' })
    }

    req.userId = decoded.id;
    return next();
  });
}
