var Redis = require('ioredis');
var save_timeout = function(key,value,timeout,callback){
	var redis = Redis();
	redis.set(key,value,'EX',timeout).then(function(){
	
	//	redis.expire(key,timeout);
	if(callback != undefined)
	callback();
	});
	//redis.set(key,timeout);
}
var save_timeout_obj = function(key,value,timeout,callback){
	save_timeout(key,JSON.stringify(value),timeout,callback);
}
var save = function(key,value,callback){
	var redis=Redis();
	redis.set(key,JSON.stringify(value)).then(function(){
		if(callback!=undefined)
			callback();
	});
}
var save_obj = function(key,value,callback){
	save(key,JSON.stringify(value),callback);
}

var get = function(key,callback){
	var redis = Redis();
	redis.get(key).then(function(data){
	if(callback!=undefined){
		callback(data);
		}
	});

}
var get_obj = function(key,callback){
	get(key,function(data){
		if(callback!=undefined){
			if(data!=undefined){
				callback(JSON.parse(data));
			}
		}
	});
}
var get_value = function(key,timeout,callback){
	var redis = Redis();
	redis.get(key).then(function(data){
		if(callback !=undefined){
			if(data!=undefined&&timeout>0)
				redis.expire(key,timeout);
			callback(data);
		}
	
	});
}
var chk_key =function(key ,callback){
	var redis = Redis ();
	redis.exists(key ).then(function(data){
		callback(data);
	});
	}
	
exports.get_and_update=get_value;
exports.save_timeout = save_timeout;
exports.check_key_isexists = chk_key;
exports.save=save;
exports.get=get;
exports.get_obj = get_obj;
exports.save_timeout_obj = save_timeout_obj;
exports.save_obj = save_obj;
