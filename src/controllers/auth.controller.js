const AuthService = require('../services/auth.service');
const { logger } = require('../utils/logger');

class AuthController {
  authService = new AuthService();

  register = async (req, res, next) => {
    try {
      const userData = req.body;
      const registeredUserData = await this.authService.register(userData);

      res.status(201).json({ data: registeredUserData, message: 'User successfully created', status: 'OK' });
    } catch (ex) {
      next(ex);
    }
  };
}

module.exports = AuthController;
