module.exports = app => app.delete('/guest/:id', app.controllers.guest.deleteGuest);