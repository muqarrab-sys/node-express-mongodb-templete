const bcrypt = require('bcrypt');

const { isEmpty } = require('../utils/util');
const userModel = require('../models/users.model');
const HttpException = require('../exceptions/HttpException');

class AuthService {
  users = userModel;

  async register(userData) {
    if (isEmpty(userData)) throw new HttpException(400, 'User data is empty');

    const findUser = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }
}

module.exports = AuthService;
