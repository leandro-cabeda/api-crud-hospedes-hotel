module.exports = app => {
  const { Guest } = app.models.guest;
  const { refatoreDocument, isDocumentValid, isPhoneValid } = app.utils.utils;

  const updateGuest = async (req, res) => {
    const { body, params: { id } } = req;
    if (!id || isNaN(id) || !body.document || !body.name || !body.phone) return res.status(400).json({ message: 'Parametro inválido ao realizar atualização de cadastro!' });

    const { document, phone, name } = body;
    if (!isDocumentValid(document)) return res.status(400).json({ message: 'Documento inválido para realizar o cadastro!' });
    else if (!isPhoneValid(phone)) return res.status(400).json({ message: 'Telefone ou Celular inválido para realizar o cadastro!' });
    const documentGuest = refatoreDocument(document);

    Guest.findByPk(id)
    .then(guest => {

      if (!guest) return res.status(404).json({ message: "Este hóspede não existe cadastrado no hotel" });
      body.id = id;
      const guestUpdate = body;

      Guest.update({
        name,
        document: documentGuest,
        phone
      },{
          where: {
            id
        }
      }).then(() => {
        res.status(200).json({ data: guestUpdate });
      }).catch(err => {
        res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
      });

    }).catch(err => {
      res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
    });
  };

  return updateGuest;
};
