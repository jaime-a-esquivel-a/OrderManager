//Importar path
const path = require('path');
//Importar express
const express = require('express');
//Importar express-handlebars
const exphbs = require('express-handlebars');
//Importar controladores
const routes = require('./controllers');
//Importar helpers
const helpers = require('./utils/helpers');
//Importar express-session
const session = require('express-session');
//Importar connect-session-sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { strict } = require('assert');
//Importar la conexión de sequelize
const sequelize = require('./config/connection');

//Inicializar variable app
const app = express();
//Definir puerto
const PORT = process.env.PORT || 3001;
//Configurar sesiones
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 900000, //Cookie expires after 15 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Hacer que la app use las sesiones
app.use(session(sess));

//Configurar handlebars y helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Configurar la app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Hacer que la app utilice todas las rutas de los controladores
app.use(routes);

//Sincronizar los modelos de sequelize con la base de datos y encender el servidor
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});