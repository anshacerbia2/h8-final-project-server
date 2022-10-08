const jwt = require('jsonwebtoken');
const {User} = require('../models');


Auth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: `Unathorized` };
    }
    const isValid = jwt.verify(access_token, process.env.SECRET);
    if (!isValid) {
      throw { name: `Unathorized` };
    }
    const data = await User.findByPk(isValid.id);
    if (!data) {
      throw { name: `Unathorized` };
    }
    req.user = {
      id: data.id,
      email: data.email,
    };
    next()
  } catch (err) {
    next(err);
  }
};

module.exports = { Auth }