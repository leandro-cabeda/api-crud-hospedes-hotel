module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo API Hotel de Hospedagem!' });
  });
};
