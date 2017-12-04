var getmes=function(){
new Vue({
    el: '#m',
    data: {
        message: 'Hello Vue.js!',
        show:true
    },
    methods: {
        loc: function () {
            alert(this.message);
        },
        user: function (a) {
$('#system').hide();
$('#'+a).show();
//$('#zhuang').removeClass('show');
//$('#'+a).removeClass('hide');
        },
        system: function (a) {
$('#user').hide();
$('#'+a).show();
//$('#activity').addClass('hide');
//$('#'+a).addClass('show');
//$('#activity').removeClass('show');
$('#'+a).removeClass('hide');
        }
    }
})
}