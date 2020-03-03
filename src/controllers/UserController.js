const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
  async register(req, res) {
    const { user } = req.body;

    if(await User.findOne({ user }) ) {
      return res.status(400).send({ error: 'Usuário já existe' });
    }

    const register =  await User.create(req.body);
    return res.json(register);
  },

  async login(req, res) {
      const { user, password } = req.body;
      const userLogged = await User.findOne({ user }).select('+password');

      if(!userLogged) {
        return res.status(400).send({ error: 'Usuário inexistente' });
      }

      if (!await bcrypt.compare(password, userLogged.password)) {
        return res.status(400).send({ error: 'Senhar inválida' })
      }

      userLogged.password = undefined;
      const token = jwt.sign({ id: userLogged.id }, authConfig.secret, {
        expiresIn: 86400,
      })

      res.send({ userLogged, token })
  }
}