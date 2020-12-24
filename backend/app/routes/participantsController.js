module.exports = (app, Part) => {
  const getParts = async (id) => {
    return await Part.findAll({where: {eventId: id}})
  }

  const createParts = async (params) => {
    return await Part.create({ ...params });
  };

  app.get('/participants/:id', (req, res) => {
    getParts(req.params.id).then(event => res.json(event))
  })

  app.post('/participants/', (req, res) => {
    console.log(req.body)
    createParts(req.body).then(event => res.json(event))
  })
};
