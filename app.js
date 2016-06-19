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

app.use(routes.post('/user/signup/', signUpSignInController.signUp));
app.use(routes.post('/user/signin/', signUpSignInController.signIn));
app.use(routes.get('/user/check/:username', signUpSignInController.check));
app.use(routes.get('/user/list/', signUpSignInController.list));
app.use(routes.get('/user/loaddata/', signUpSignInController.loadData));


app.listen(3000);
console.log('The app is listening at port 3000');
