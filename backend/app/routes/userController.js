const nodemailer = require("nodemailer");
const mailerCond = require('../../config/mailer');
const { Op } = require("sequelize");
module.exports = (app, User, Role) => {
  // create a user
  const createUser = async (params) => {
    return await User.create({ ...params });
  };

  const getAllUsers = async () => {
    return await User.findAll();
  };

  const getAllUsersConfirmed = async () => {
    return await User.findAll({
      where: {
        status: {
          [Op.not]: 'not confirmed'
        },
        statusAccount: 'active'
      }
    });
  };

  const getUser = async (id) => {
    return await User.findAll({
      where: {
        id: id
      },
      include: [{
        model: Role
      }]
    })
  }

  // register route
  app.post('/register', function(req, res, next) {
    req.body.roleId = 4;

    User.findAll({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user.length) {
        res.json({msg: 'Данная почта уже используется', status: false});
      } else {
        createUser(req.body).then(user =>
        {
          const userId = user.id;
          const transporter = nodemailer.createTransport(mailerCond);
          let message = `Уважаемый ${user.firstName} ${user.lastName}. \n`
          message += `Перейдите по ссылке для подтверждения регистрации http://localhost:3000/conf/${userId}`
          transporter.sendMail({
            from: 'r.v.bolvin@tmn3.etagi.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Регистрация", // Subject line
            html: message
          });
          res.json({user, status:true});
        }
        );
      }
    })
  })

  app.get('/conf/:id', (req, res) => {
    getUser(req.params.id).then(user => {
      if (user[0].status === 'not confirmed') {
        User.update(
          {
            status: 'conf_mail'
          },
          {where: {
              id: req.params.id
            }}
        ).then(user => res.json({msg: 'Регистрация подтверждениа.'}))
      } else {
        res.json({msg: 'Пользователь уже подтвержден'})
      }
    })
  })

  app.post('/users', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    getAllUsers().then(user => res.json(user));
  })

  app.get('/user/:id', (req, res) => {
    getUser(req.params.id).then(users => res.json(users))
  })

  // get all users
  app.get('/users', (req, res) => {
    getAllUsers().then(user => res.json(user));
  })

  app.get('/users/admin', (req, res) => {
    getAllUsersConfirmed().then(user => res.json(user));
  })

  app.delete('/users/admin/:id', (req, res) => {
    User.update(
      {
        statusAccount: 'delete'
      },
      {where: {
          id: req.params.id
        }}
    ).then(user => getAllUsersConfirmed().then(user => res.json(user)))
  })

  app.put('/users/admin/:id', (req, res) => {
    User.update(
      {
        status: 'confirmed'
      },
      {where: {
          id: req.params.id
        }}
    ).then(user => getAllUsersConfirmed().then(user => res.json(user)))
  })

  app.put('/user/:id', (req, res) => {
    User.update(
      {
        ...req.body
      },
      {where: {
          id: req.params.id
        }}
    ).then(user => {
      getUser(req.params.id).then(user => res.json(user))
    })
  })

};
