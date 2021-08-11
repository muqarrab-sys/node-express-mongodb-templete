const config = require('config');

const { host, port, database } = config.get('dbConfig');

const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

module.exports = dbConnection;
