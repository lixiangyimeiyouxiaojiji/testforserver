var set=function(t){
var MyComponent = Vue.extend({
  template: '<div class="weui_uploader_input_wrp"><input type="file" accept="image/*" class="weui_uploader_input"></input></div>'
})
var vm=new Vue({
          el: '#publish',
          methods:{
              pub:function(event){
                  new MyComponent().$mount().$before('#p')
              }
          }
        });      
}