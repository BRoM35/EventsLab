module.exports = (app, Doc, Event) => {
  const getDocs = async () => {
    return await Doc.findAll({
      where: {statusDocument: 'active'}
    })
  }

  const getDocsEvent = async (id) => {
    return await Doc.findAll({
      where: {statusDocument: 'active', eventId: id}
    })
  }

  const getDoc = async (id) => {
    return await Doc.findAll({
      where: {id},
      include: [{
        model: Event
      }]
    })
  }

  const createDocs = async (params) => {
    return await Doc.create({ ...params });
  };

  app.get('/documents', (req, res) => {
    getDocs().then(doc => res.json(doc))
  })

  app.post('/documents', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    createDocs(req.body).then(doc => {
      getDocs().then(docs => {
        res.json(docs);
      })
    });
  })

  app.delete('/document/:id', (req, res) => {
    Doc.update(
      {
        statusDocument: 'delete'
      },
      {where: {
          id: req.params.id
        }}
    ).then(doc => {
      getDocs().then(doc => {
        res.json(doc)
      })
    })
  })

  app.get('/document/:id', (req, res) => {
    getDoc(req.params.id).then(doc => res.json(doc))
  })

  app.put('/document/:id', (req, res) => {
    Doc.update(
      {
        ...req.body
      },
      {where: {
          id: req.params.id
        }}
    ).then(docs => {
      getDoc(req.params.id).then(doc => res.json(doc))
    })
  })

  app.get('/documents/:id', (req, res) => {
    getDocsEvent(req.params.id).then(doc => res.json(doc))
  })

  app.put('/document/sign/:id', (req, res) => {
    const userId = req.body.userId;
    Doc.update(
      {
        status: 'signed',
        userId
      },
      {where: {
          id: req.params.id
        }}
    ).then(docs => {
      getDocs().then(doc => res.json(doc))
    })
  })

};
