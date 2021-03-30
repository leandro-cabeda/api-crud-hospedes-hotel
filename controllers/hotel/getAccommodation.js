module.exports = app => {
    const { Hotel } = app.models.hotel;
    const { Guest } = app.models.guest;

    const getAccommodation = async (req, res) => {

        Hotel.findAll({
            raw: true, order: [
                ["id", "desc"]
            ],
            include: [
                {
                    model: Guest
                }
            ]
        }).then(accommodation => {
            res.status(200).json({ data: accommodation });
        }).catch(err => {
            res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
        });
    }

    return getAccommodation;
}