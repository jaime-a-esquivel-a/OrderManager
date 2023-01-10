//Validar autorización del usuario
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {  //Si el usuario no inició sesión
      res.redirect('/login'); //Redirigir a la pantalla de inicio de sesión
    } else { 
      next(); //Continuar
    }
  };
  
  module.exports = withAuth; //Exportar autorización