const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');

class AuthRoutes {
  path = '/';
  router = Router();
  authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /*
    * @ Route: /register
    */
    this.router.post(`${this.path}register`, this.authController.register);
  }
}

module.exports = AuthRoutes;
