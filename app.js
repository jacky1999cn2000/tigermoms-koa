'use strict';

var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');
var cors = require('koa-cors');

var signUpSignInController = require('./controllers/SignUpSignInController');

app.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS'
}));

app.use(routes.post('/signup/', signUpSignInController.signUp));
// app.use(routes.get('/client/:api_key/', clientController.getClients));
// app.use(routes.post('/client/', clientController.createClient));
// app.use(routes.put('/client/:uuid/', clientController.updateClient));
// app.use(routes.delete('/client/:uuid', clientController.destroyClient));
// app.use(routes.post('/verify/', clientController.verify));
// app.use(routes.get('/version', clientController.version));
// app.use(routes.get('/available', clientController.available));

app.listen(3000);
console.log('The app is listening at port 3000');
