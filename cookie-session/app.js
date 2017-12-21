var express=require('express')
var cookieParser=require('cookie-parser')
var cookieSession=require('cookie-session')
var app=express();
app.use(cookieParser());
//app.use(cookieSession({//设置
//	name:'sess',
//	keys:['aaa','bbb','ccc']
//}))
app.get('/',function(req,res){
	//如果请求中的cookie存在isVisit,输出cookie
	//否则，设置cookie字段的isVisit，并设置过期时间
	if(req.cookies.isVisit){
		console.log(req.cookies);
		res.send('欢迎再次访问')
	}else{
		res.cookie('isVisit',1,{maxAge:60*1000});
		res.send('欢迎第一次访问')
	}
})
app.listen(3000)
