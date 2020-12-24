const user = require('./userController');
const event = require('./eventsController');
const participants = require('./participantsController')
const doc = require('./documentsController')

module.exports = function(
  app, User, Role, Event, Doc, Part
  ) {
  user(app, User, Role);
  event(app, Role, Event, Part)
  participants(app, Part)
  doc(app, Doc, Event)
};
