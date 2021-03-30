module.exports = app => {
  const { Guest } = app.models.guest;

  const deleteGuest = async (req, res) => {
    const { params: { id } } = req;
    if (!id || isNaN(id)) return res.status(400).json({ message: 'Parametro inválido ao realizar deletação de cadastro!' });

    Guest.findByPk(id)
      .then(guest => {

        if (!guest) return res.status(404).json({ message: "Este hóspede não existe cadastrado no hotel" });

        Guest.destroy({
          where: { id }
        }).then(() => {
          res.status(204).json();
        }).catch(err => {
          res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
        });

      }).catch(err => {
        res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
      });
  };

  return deleteGuest;
};
