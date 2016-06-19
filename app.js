'use strict';

var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');
var cors = require('koa-cors');

var userController = require('./controllers/userController');

app.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS'
}));

app.use(routes.post('/user/signup/', userController.signUp));
app.use(routes.post('/user/signin/', userController.signIn));
app.use(routes.get('/user/check/:username', userController.check));
app.use(routes.get('/user/list/', userController.list));
app.use(routes.get('/user/loaddata/', userController.loadData));


app.listen(3000);
console.log('The app is listening at port 3000');
