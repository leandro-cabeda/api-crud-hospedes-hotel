module.exports = app => {
  const { Guest } = app.models.guest;
  const { refatoreDocument, isDocumentValid, isPhoneValid } = app.utils.utils;

  const createGuest = async (req, res) => {
    const { body } = req;
    if (!body.document || !body.name || !body.phone) return res.status(400).json({ message: 'Parametro inválido ao realizar o cadastro!' });

    const { document, phone, name } = body;
    if (!isDocumentValid(document)) return res.status(400).json({ message: 'Documento inválido para realizar o cadastro!' });
    else if (!isPhoneValid(phone)) return res.status(400).json({ message: 'Telefone ou Celular inválido para realizar o cadastro!' });
    const documentGuest = refatoreDocument(document);
    const nameGuest = name;

    Guest.findOne({
      where: {
        document: documentGuest
      }
    }).then(guest => {

      if (guest) return res.status(400).json({ message: "Este hóspede já existe cadastrado no hotel" });

      Guest.create({
        name: nameGuest.toLowerCase(),
        document: documentGuest,
        phone
      }).then(createdGuest => {
        res.status(201).json({ data: createdGuest });
      }).catch(err => {
        res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
      });

    }).catch(err => {
      res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
    });
  };

  return createGuest;
};
