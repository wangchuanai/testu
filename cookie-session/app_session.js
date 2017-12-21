var express=require('express')
var cookieParser=require('cookie-parser')
var cookieSession=require('cookie-session')
var app=express();
app.use(cookieParser());
app.use(cookieSession({//设置
	secret:'a8ki app',//sexret建议使用随机字符
	cookie:{maxAge:60*1000}
}))
app.get('/session',function(req,res){
	//如果请求中的cookie存在isVisit,输出cookie
	//否则，设置cookie字段的isVisit，并设置过期时间
	if(req.session.signed){//用户是否已登陆
		console.log(req.session)
		res.send(`欢迎${req.session.name}回来`)
	}else{
	req.session.signed=true;
	req.session.name='Peter';
	res.send('欢迎第一次登录！')
	}
})
app.listen(3000)
