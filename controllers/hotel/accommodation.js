module.exports = app => {
  const { Hotel } = app.models.hotel;
  const { dayOfWeek, validDayExtra, diffDateInAndDateOut, validFunctionsByDate } = app.utils.utils;
  const accommodation = async (req, res) => {
    const { body } = req;
    if (!body.numberBedroom || !body.dateIn || !body.dateOut || !body.guestId || !body.additionalVehicle) return res.status(400).json({ message: 'Parametro inválido ao realizar a hospedagem inicial!' });

    const { additionalVehicle, numberBedroom, dateIn, dateOut, guestId } = body;

    const message = validFunctionsByDate(dateIn, dateOut);
    if (message) return res.status(400).json({ message });

    const dayOfweek = ['SABADO', 'DOMINGO'];
    const validDayDateIn = dayOfweek.includes(dayOfWeek(dateIn));
    const validDayDateOut = dayOfweek.includes(dayOfWeek(dateOut));
    const daysExtra = diffDateInAndDateOut(dateIn, dateOut);
    const validDayExtraDateOut = validDayExtra(dateOut);
    let value = 0.00;
    let amount = 0.00;
  
    if (additionalVehicle) {
      value = 120.00 + 15.00;
      if (validDayDateIn && validDayDateOut ||
        !validDayDateIn && validDayDateOut ||
        validDayDateIn && !validDayDateOut) {
        value = 150.00 + 20.00;
      }
    } else {
      value = 120.00;
      if (validDayDateIn && validDayDateOut ||
        !validDayDateIn && validDayDateOut ||
        validDayDateIn && !validDayDateOut) {
        value = 150.00;
      }
    }

    if (daysExtra == 0) {
      amount = validDayExtraDateOut ? value * 2 : value;
    } else {
      const diffExtraValue = (daysExtra - 1);
      const extraValue = diffExtraValue == 0 ? value : (value * diffExtraValue);
      amount = validDayExtraDateOut ? ((value * 2) + extraValue) : (value * daysExtra);
    }

    Hotel.findOne({
      where: {
        numberBedroom
      }
    }).then(storedAccommodation => {

      if (storedAccommodation) return res.status(400).json({ message: "Já há registro de hospedagem para esse quarto do hotel" });

      Hotel.create({
        numberBedroom,
        dateIn,
        dateOut,
        guestId,
        additionalVehicle,
        value,
        amount
      }).then(registerAccommodation => {
        res.status(201).json({ data: registerAccommodation });
      }).catch(err => {
        res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
      });

    }).catch(err => {
      res.status(500).json({ message: "Ocorreu falha durante a conexão do banco. Err: " + JSON.stringify(err) });
    });
  };

  return accommodation;
};
