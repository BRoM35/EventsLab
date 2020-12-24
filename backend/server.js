const express        = require('express');
const bodyParser     = require('body-parser');
const jwt = require('jsonwebtoken');
const app            = express();
const cors = require('cors');
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

const {
  User,
  Role,
  Event,
  Doc,
  Part
} = require('./sequelize')

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
app.use(passport.initialize());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(
  app,
  User,
  Role,
  Event,
  Doc,
  Part
);

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    let user = await getUser({ email });
    console.log(user);
    if (!user) {
      res.status(401).json({ msg: 'Нет такого пользователя' });
    }
    if (user.password === password) {

      if (user.status === 'confirmed') {
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token, user });
      } else {
        if (user.status === 'not confirmed') {
          res.status(401).json({ msg: 'Аккаунт ждет подтверждения на почте' });
        } else {
          res.status(401).json({ msg: 'Ожидайте подтверждение аккаунта администратором' });
        }
      }

    } else {
      res.status(401).json({ msg: 'Пароль не верный' });
    }
  }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});
