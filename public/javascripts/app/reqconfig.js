
var setname=function(namestr){
var createNonceStr=Math.random().toString(36).substr(2, 15);
var createTimeStamp=parseInt(new Date().getTime() / 1000);
$('.carousel').carousel({
  interval: 5000
})
//namestr=namestr.toString();
//var nub = namestr.indexOf(',');
//nub++;
//var usermsg = JSON.parse(namestr.substring(nub));
//alert(usermsg.nickname);
//nub--;
DD_roundies.addRule('.websjy3', '1000px', true);
var ticket=namestr;
var wx=require(['http://res.wx.qq.com/open/js/jweixin-1.1.0.js'],function(wx){
wx.config({
    debug: false, // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴�����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log����������pc��ʱ�Ż���ӡ��
    appId: 'wx013e5264c436ddc8', // ������ںŵ�Ψһ��ʶ
    timestamp: createTimeStamp, // �������ǩ����ʱ����
    nonceStr: createNonceStr, // �������ǩ����������
    signature: calcSignature(ticket, createNonceStr, createTimeStamp, 'http://wx.cloud-social.com/index/'),// ���ǩ��������¼1
    jsApiList: [ 
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'

  ] // �����Ҫʹ�õ�JS�ӿ��б�������JS�ӿ��б���¼2
});
wx.ready(function(){
   //alert('ok');
});
//wx.error(function(res){
//   alert('error:'+res);
//});
}
);
$(".weui_tabbar_item").bind("click", function(){
  	//alert($(this).attr('id'));
$(".show").addClass('hide');
$(".show").removeClass('show');
	$('#show'+$(this).attr('id')).addClass('show');
            $(this).addClass('weui_bar_item_on').siblings('.weui_bar_item_on').removeClass('weui_bar_item_on');
        });
new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        show:true
    },
    methods: {
        loc: function () {
wx.openAddress({
      success: function () { 
alert('lalalalala');          
           },
      cancel: function () {     
       alert('ȡ��'); 
           }});
            alert(this.message);
        },
        act: function (a) {
$('#zhuang').hide();
$('#'+a).show();
//$('#zhuang').removeClass('show');
//$('#'+a).removeClass('hide');
        },
        zhuang: function (a) {
$('#activity').hide();
$('#'+a).show();
//$('#activity').addClass('hide');
//$('#'+a).addClass('show');
//$('#activity').removeClass('show');
$('#'+a).removeClass('hide');
        }
    }
})

var calcSignature = function (ticket, noncestr, ts, url) {
          var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
          var shaObj = hex_sha1(str);
          return shaObj;
     }

};
