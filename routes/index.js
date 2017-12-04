var express = require('express');
var router = express.Router();
var getQSdata= require('../qs-wx-config/requiredata');
var redis= require('../redis/save_qs_data');
var http = require('http');
var parseString = require('xml2js').parseString;
var xml2js=require('xml2js');
var getinitoption = function (invoketype, method) {
    return {
        hostname: '10.25.78.64',
        port: 80,
        method: invoketype,
        path: '/wechatapp/'+method,
        headers:{
        "Content-Type": "application/json"
    }
    };
};

var postandget = function (method, data, callback){
    var req1 = http.request(getinitoption('POST', method), function (res) {
        res.setEncoding('utf8');
        var alldata = '';
        res.on('data', function (chunk) {
            alldata = alldata + chunk;
        });
        res.on('end', function () {
            console.log('request :' +alldata);
            try { 
                var senddata = JSON.parse(alldata);
                callback(senddata);
            } catch (a) {
                console.log(method + ' ' + a);
                console.log(alldata);
            }
     
        });
    });
    req1.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req1.write(JSON.stringify(data));
    req1.end();
}
var getReturnData = function(postData,msgType,Content,callback){
	var retdata = "<xml><ToUserName><![CDATA["+postData.FromUserName+"]]></ToUserName><FromUserName><![CDATA["+postData.ToUserName+"]]></FromUserName><CreateTime>"+new Date().getTime()/1000+"</CreateTime><MsgType><![CDATA["+msgType+"]]></MsgType><Content><![CDATA["+Content+"]]></Content></xml>";
	callback(retdata);
}
var getReturnText_PictureData = function(postData,msgType,title,description1,picurl,url,callback){	
	var retdata = "<xml><ToUserName><![CDATA["+postData.FromUserName+"]]></ToUserName><FromUserName><![CDATA["+postData.ToUserName+"]]></FromUserName><CreateTime>"+new Date().getTime()/1000+"</CreateTime><MsgType><![CDATA["+msgType+"]]></MsgType><ArticleCount>1</ArticleCount><Articles><item><Title><![CDATA["+title+"]]></Title> <Description><![CDATA["+description1+"]]></Description><PicUrl><![CDATA["+picurl+"]]></PicUrl><Url><![CDATA["+url+"]]></Url></item></Articles></xml>";
	callback(retdata);
}
router.get('/', function(req, res, next) {
  res.render('test',{ title: '尝试一波'})
})
router.get('/index/:a', function(req, res, next) {
  var pictureArry=[];
  var t="";
  getQSdata.httpgetdata('http://10.25.78.64/wechatapp/jsapi_ticket/wx013e5264c436ddc8',function(ticket){
    t=ticket.ticket;
    console.log('获取得到ticket:'+t);
  })
  console.log('传过来的openid:+++'+req.params.a);
   getQSdata.getqsData(req.params.a,2,function(re){
  console.log('创建完毕:'+re.MSG);
})
  getQSdata.getqsData(req.params.a,1,function(re){
  //var str = JSON.stringify(re);
  // console.log('json转字符串'+str);
  //redis.save("first",re);
  //redis.get_obj('first',function(data){
    console.log('存储完毕:'+data);
  //})
  console.log('获取完毕:'+re);
})
var da={
appid:'wx013e5264c436ddc8',
openid: req.params.a,
};
postandget('user_info',da,function(user){
getQSdata.getqsData('',0,function(p){
  console.log('传过来图片:'+p+';第一个:'+p[0].IMGPATH);
  for(var i=0;i<p.length;i++){
   if(p[i].IMGPATH!=''){
  pictureArry.push(p[i].IMGPATH);
}
}
  console.log('++后茩猴的ticket+:'+t);
  res.render('index',{ 
  ticket: t,
  nickname: user.nickname,
  sex: user.sex,
  language: user.language,
  city: user.city,
  province: user.province,
  country: user.country,
  headimgurl:user.headimgurl,
  pic1:pictureArry[0],
  pic2:pictureArry[1],
  pic3:pictureArry[2],
});
});
});    

});
router.get('/field/', function(req, res, next) {
 getQSdata.getqsData('',3,function(re){
  console.log('nongc:'+re[0].VCBANNER.DATA[0].IMGPATH);
res.render('field',{ title: '趣农场',pic1: re[0].VCBANNER.DATA[0].IMGPATH,pic2: re[0].VCBANNER.DATA[1].IMGPATH,pic3: re[0].VCBANNER.DATA[0].IMGPATH});
})
});
router.get('/pick/', function(req, res, next) {
  res.render('pick',{ title: '趣农场'});
});
router.get('/ingredients/', function(req, res, next) {
  getQSdata.getqsData('',4,function(re){
  console.log('ingredients:'+re[1].PICPATH);
res.render('ingredients',{ title: '舒飞科技',pic1: re[1].PICPATH,pic2: re[2].PICPATH,pic3: re[3].PICPATH,t1: re[1].ITEMMODAL,t2: re[2].ITEMMODAL});
})
//res.render('ingredients',{ title: '趣农场'});
});
router.get('/more/', function(req, res, next) {
  res.render('more',{ title: '趣农场'});
});
router.get('/message/', function(req, res, next) {
  res.render('message',{ title: '趣农场'});
});
router.get('/publish/', function(req, res, next) {
  res.render('publish',{ title: '趣农场'});
});
router.get('/getcode/', function(req, res, next) {
 getQSdata.getqsData('',3,function(re){
  console.log('nongc:'+re[0].VCNEWS.DATA[0].PICPATH);
res.render('family',{ title: '趣农场',pic1: re[0].VCNEWS.DATA[0].PICPATH,pic2: re[1].VCNEWS.DATA[0].PICPATH});
})

});
router.get('/barcode/:barcode', function(req, res, next) {
  var code=req.params.barcode;
  res.render('wxdevice', { title: '查看巡查信息',barcode:code});
});

router.post('/',function(req,res,next){
	var postData = '';
	req.on('data',function(postDataChunk){
	postData +=postDataChunk;
		});
	req.on('end',function(){
	console.log('收到的数据:'+postData);
	parseString(postData,{ explicitArray : false, ignoreAttrs : true },function(err,result){
		var data=result;
		console.log(data);
		if(result.xml.MsgType=='text'){
                	getReturnData(result.xml,'text','hello world type:text,content:'+result.xml.Content,function(retData){
			res.send(retData);
			});
		}else if(result.xml.MsgType=='event'){
if(result.xml.Event=='CLICK'){
getReturnText_PictureData(result.xml,'news','趣农场','致力于技术研究，专业码农。','http://pic.baike.soso.com/p/20130410/20130410093930-482156936.jpg','http://session.cloud-social.com/wechatapp/wx013e5264c436ddc8/?state=http://wx.cloud-social.com/index/'+result.xml.FromUserName,function(retData){                res.send(retData);
  });
}else
if(result.xml.Event=='scancode_waitmsg'){
               
//http.get("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx013e5264c436ddc8&redirect_uri=http%3a%2f%2fwx.cloud-social.com%2f&response_type=code&scope=SCOPE&state=STATE#wechat_redirect", function(res) {
             var code=result.xml.ScanCodeInfo.ScanResult;
             var index = code.indexOf(',');
		if(index>-1)
			code = code.substr(index+1);
		getReturnData(result.xml,'text','点击查看设备信息: wx.cloud-social.com/barcode/'+code,function(Data){
			res.send(Data);
			});
}
			else{
getReturnData(result.xml,'text','有美好的事情发生',function(retData){
			res.send(retData);
			});
}
		}else{
			console.log('msg Type:'+result.xml.MsgType);
			
                	getReturnData(result.xml,'text','hello world msgType:'+result.xml.MsgType,function(retData){
			res.send(retData);
		}
);
		}			
//		res.send(writedata);

	});
});
});
module.exports = router;
module.exports.postandget =postandget;
