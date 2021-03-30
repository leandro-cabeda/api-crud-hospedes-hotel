module.exports = app => {
  const { Guest, Op } = app.models.guest;
  const { refatoreDocument } = app.utils.utils;

  const getGuest = async (req, res) => {
    let field = (req.query && req.query.search) || undefined;
    if (!field) return res.status(400).json({ message: 'Parametro inválido ao realizar busca!' });

    field = refatoreDocument(field);

    Guest.findOne({
      where: {
        [Op.or]: [
          { name: field.toLowerCase() },
          { document: field },
          { phone: field },
        ]
      }
    }).then(guest => {

      if (!guest) return res.status(404).json({ message: "Este hóspede não existe cadastrado no hotel" });

      res.status(200).json({ data: guest });
      
    }).catch(err => {
      res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
    });
  };

  return getGuest;
};
