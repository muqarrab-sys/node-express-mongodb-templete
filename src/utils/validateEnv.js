const { cleanEnv, port, str } = require('envalid');

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

module.exports = validateEnv;
