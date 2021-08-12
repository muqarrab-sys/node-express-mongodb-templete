const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const asyncMiddleware = require('../middlewares/async.middleware');

class AuthRoutes {
  path = '/';
  router = Router();
  authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    /*
     * @Route: /register
     */
    this.router.post(`${this.path}register`, asyncMiddleware(this.authController.register));
    this.router.post(`${this.path}login`, asyncMiddleware(this.authController.login));
  }
}

module.exports = AuthRoutes;
