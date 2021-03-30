const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(bodyParser.json());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  app.use(
    cors({
      origin: '*',
    }),
  );

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, COPY');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
};
