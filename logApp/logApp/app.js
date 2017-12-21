var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession=require('cookie-session')
var user=require('./user.json')
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
	secret:'secret',//安全secret属性
	cookie:{maxAge:60*1000*30},//设置过期时间
}))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
	if (req.session.sign) {
		console.log(req.session)//打印出session
		res.render('sign.ejs',{session:req.session})
	}else{
		res.render('index.ejs',{title:'index'})
	}
})

app.post('/sign',(req,res)=>{
	if (!user[req.body.user]) {
		res.send('输入错误')
	}else if (req.body.password !=user[req.body.user].password || !user[req.body.user].password) {
		res.send('登录失败')
	}else{
		req.session.sign=true
		req.session.name=user[req.body.user].name;
		res.send(`欢迎${req.session.name} <a href="/out">退出</a>`)
	}
})
app.get('/out',(req,res)=>{
	res.redirect('/')//重定向
})
//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
