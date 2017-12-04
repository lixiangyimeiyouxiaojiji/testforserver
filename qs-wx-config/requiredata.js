var http = require('http');
var httpgetdata = function(url,callback){
        console.log(url);
        http.get(encodeURI(url),function(res){
                var resdata = '';
                res.on('data',function(chunk){
                        resdata+= chunk;
                 console.log('diao+'+resdata);
                        });
                res.on('end',function(){
                        if(callback!=undefined)
                        {
                                var obj = JSON.parse(resdata);
                                callback(obj);
                        }
                });
        });
}

var p = function(code,type){
 var ps='';
 if(type==0){
ps='http://d.nongyongtong.com:99/server/api/YNY/VCBANNER/21769b8ec4b143ecb4b40b4f7af34661/LISTINFO?TIMESTAMP=1212222222&LAT=0&LNG=0&USERTOKEN=8b8ee6e3bd144920a58297457d4bf527&PAGENUM=0&PAGESIZE=30&SOURCEAID=CQUOTATIONBILL&SOURCEID=bd9a54c8db494e0e8082744b43e898a5';
}//首页轮播图
 if(type==1){
  ps= 'http://d.nongyongtong.com:99/server/api/YNY/CUSER/21769b8ec4b143ecb4b40b4f7af34661/CREATE?TIMESTAMP=1212222222&LAT=0&LNG=0&USERTOKEN=8b8ee6e3bd144920a58297457d4bf527&DATA=[{"ACCOUNTID":"","CREATETIME":"1212222222","ENABLE":"Y","USERID":"15277334175","USERTOKEN":"'+code+'","SUPERVISE":"aw6w4w2c2l0s4e5n8c9om94702f5b97d"}]';
}//用户授权
if(type==2){ ps='http://d.nongyongtong.com:99/server/api/YNY/USERTOKEN/21769b8ec4b143ecb4b40b4f7af34661/CREATE?TIMESTAMP=1212222222&LAT=0&LNG=0&DATA=[{"USERTOKEN":"'+code+'"}]';
}//创建用户
if(type==3){
ps='http://d.nongyongtong.com:99/server/api/YNY/CQUOTATIONBILL/21769b8ec4b143ecb4b40b4f7af34661/LISTDETAIL?TIMESTAMP=1212222222&LAT=0&LNG=0&USERTOKEN=8b8ee6e3bd144920a58297457d4bf527&PAGENUM=0&PAGESIZE=200&BUSSTYPE=家庭农场&LISTDETAIL=[{"AID":"VCBANNER","PAGENUM":0,"PAGESIZE":20},{"AID":"CLOC","PAGENUM":0,"PAGESIZE":20},{"AID":"VCNEWS","PAGENUM":0,"PAGESIZE":20}]';
}//家庭农场
if(type==4){
ps='http://d.nongyongtong.com:99/server/api/YNY/VCPRODUCT/21769b8ec4b143ecb4b40b4f7af34661/LISTINFO?TIMESTAMP=1222212122&LAT=0&LNG=0&USERTOKEN=8b8ee6e3bd144920a58297457d4bf527&PAGENUM=0&PAGESIZE=10';
}//臻品食材
return ps;
};
var getqsData=function(code,type,callback){
httpgetdata(p(code,type),function(data){
                console.log('data 旗硕:'+data.DATA);
                        callback(data.DATA);
               });
                          
}
module.exports.getqsData=getqsData;
module.exports.httpgetdata=httpgetdata;
