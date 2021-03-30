const express = require('express');

const app = express();
const consign = require('consign');

consign()
  .then('./database/database.js')
  .then('./middlewares')
  .then('./utils/utils.js')
  .then('./models')
  .then('./welcome')
  .then('./controllers')
  .then('./routes')
  .then('./notFound')
  .into(app);

module.exports = app;
