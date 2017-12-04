var setgrol=function(){
$(".cur").bind("click", function(){
  	//alert($(this).attr('id'));
$(".show").addClass('hide');
$(".show").removeClass('show');
	$('#'+$(this).attr('id')+'_s').addClass('show');
        });
}