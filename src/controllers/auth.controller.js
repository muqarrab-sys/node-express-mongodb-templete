const AuthService = require('../services/auth.service');
const CreateResponseObject = require('../utils/CreateResponseObject');

class AuthController {
  authService = new AuthService();

  register = async (req, res) => {
    const response = new CreateResponseObject();

    const userData = req.body;

    await this.authService.register(userData);

    response.data = {};
    response.message = 'User successfully created';
    response.status = 'OK';

    res.status(201).json(response);
  };

  login = async (req, res) => {
    const response = new CreateResponseObject();

    const userCredantials = req.body;

    const { userData, token } = await this.authService.login(userCredantials);

    response.data = userData;
    response.message = 'User successfuly fetched';
    response.status = 'OK';

    res.status(200).header('Authorization', token).json(response);
  };
}

module.exports = AuthController;
