const bcrypt = require('bcrypt');
const _ = require('lodash');
const { isEmpty } = require('../utils/util');
const { userModel, userSchemaValidation } = require('../models/users.model');
const HttpException = require('../exceptions/HttpException');
const createAuthToken = require('../utils/createAuthToken');

class AuthService {
  users = userModel;

  //?====================================================================================
  //!                                     Register                                      =
  //?====================================================================================
  async register(userData) {
    if (isEmpty(userData)) throw new HttpException(400, 'User data is empty');

    const validationError = await userSchemaValidation.validate(userData);
    if (!!validationError.error) throw new HttpException(400, validationError.error.message);

    const findUser = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email already exists`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const createUserData = await this.users.create({ ...userData, password: hashedPassword });
  }

  //?====================================================================================
  //!                                       Login                                       =
  //?====================================================================================
  async login(userCredantials) {
    if (isEmpty(userCredantials)) throw new HttpException(400, 'User data is empty');

    let userData = await this.users.findOne({ email: userCredantials.email });
    if (!userData) throw new HttpException(400, `This email was not found`);

    const isPasswordMatching = await bcrypt.compare(userCredantials.password, userData.password);
    if (!isPasswordMatching) throw new HttpException(400, `Incorrect password`);

    const { token } = createAuthToken(userData);

    userData = _.pick(userData, ['_id', 'firstName', 'lastName', 'email']);

    return { userData, token };
  }

  //?====================================================================================
  //!                                 Forget Password                                   =
  //?====================================================================================
  async forgetPassword() {}
}

module.exports = AuthService;
