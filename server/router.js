const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getImages', mid.requiresLogin, controllers.Image.getImages);
  app.get('/getMyImages', mid.requiresLogin, controllers.Image.getUserSpecificImages);
  app.get('/query', mid.requiresLogin, controllers.Account.infoQuery);
  app.get('/app', mid.requiresLogin, controllers.Image.imagePage);
  app.post('/app', mid.requiresLogin, controllers.Image.make);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/newPass', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/delete', mid.requiresLogin, controllers.Account.removeAccount);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
