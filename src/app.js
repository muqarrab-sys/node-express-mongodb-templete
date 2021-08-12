process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

const express = require('express');
const { connect, set } = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');

const dbConnection = require('./databases');
const { logger, stream } = require('./utils/logger');
const errorMiddleware = require('./middlewares/error.middleware');

class App {
  constructor(routes) {
    this.app = express();
    this.port = process.env.PORT || 9090;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info('==============================');
      logger.info('=     Welcome to Express     =');
      logger.info(`=      env: ${this.env}      =`);
      logger.info(`=      listning to ${this.port}      =`);
      logger.info('==============================');
    });
  }

  getServer() {
    return this.app;
  }

  connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options).then(() => {
      logger.info('==============================');
      logger.info(`=    Connected to MongoDB    =`);
      logger.info('==============================');
    });
  }

  initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    // this.app.use(hpp()); //! doesn't work for some reason... research!!
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes(routes) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

module.exports = App;
