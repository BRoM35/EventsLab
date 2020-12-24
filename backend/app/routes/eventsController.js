module.exports = (app,  Role, Event, Part) => {
  const createEvent = async (params) => {
    return await Event.create({ ...params });
  };

  const getEvents = async () => {
    return await Event.findAll({where:{statusEvent: 'active'}})
  }

  const getParts = async () => {
    return await Part.findAll()
  }

  const test = (events, parts) => {
    const newEvents = [];

    events.forEach(event => {
      const newEvent = event.toJSON();
      const eventPart = parts.filter(part => part.toJSON().eventId === event.id && part.toJSON().status === 'asigned')

      newEvent['part'] = eventPart.length;
      newEvents.push(newEvent)
    });

    return newEvents;
  }

  app.get('/events', (req, res) => {
    getEvents().then(events => {
      getParts().then(parts => {
        const newEvents = test(events, parts);

        res.json(newEvents);
      })
    })
  })

  app.post('/events', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    createEvent(req.body).then(events => {
      getEvents().then(events => {
        getParts().then(parts => {
          const newEvents = test(events, parts);

          res.json(newEvents);
        })
      })
    });
  })

  app.get('/event/:id', (req, res) => {
    getEvents().then(events => {
      getParts().then(parts => {
        const newEvents = test(events, parts);
        const filterEvent = newEvents.filter(item => item.id === +req.params.id)

        res.json(filterEvent);
      })
    })
  })

  app.delete('/event/:id', (req, res) => {
    Event.update(
      {
        statusEvent: 'delete'
      },
      {where: {
          id: req.params.id
        }}
    )
  })

  app.put('/events/:id', (req, res) => {
    Event.update(
      {
        ...req.body
      },
      {where: {
          id: req.params.id
        }}
    ).then(event => {
      getEvents().then(events => {
        getParts().then(parts => {
          const newEvents = test(events, parts);
          const filterEvent = newEvents.filter(item => item.id === +req.params.id)

          res.json(filterEvent);
        })
      })
    })
  })

};
