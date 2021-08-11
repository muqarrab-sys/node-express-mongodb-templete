process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

const App = require('./app');
const AuthRoutes = require('./routes/auth.routes');
const validateEnv = require('./utils/validateEnv');

validateEnv();

const app = new App([new AuthRoutes()]);

app.listen();
