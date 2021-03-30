const app = require('./server/server');
const port = process.env.PORT || 3000;
const { Connect }= app.database.database;

Connect.authenticate()
  .then(() => {
    console.log("Conexão estabelicida com PostgreSql");
  })
  .catch(msgErro => {
    console.log(msgErro);
  });

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
