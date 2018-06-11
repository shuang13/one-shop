$(document).ready(function(){
	$(".person").mouseover(function(){
		$(".change-acount").css("display","block");
	});
	$(".person").mouseout(function(){
		$(".change-acount").css("display","none");
	});
	$(".sub").click(function(){
		$(".sub-menu-item").toggle(500);
	});
	$(".menu-item").click(function(){
		$(this).css({
			"color": "#2d8cf0",
   			"border-right": "2px solid #2d8cf0"
		}).siblings().css({
			"color": "rgba(255, 255, 255, 0.7)",
   			"border-right": "none"
		})
	});
	$(".sub-item").click(function(){
		$(this).css({
    		"color": "#fff",
    		"background": "#2d8cf0",
    		"border-right": "none"
		}).siblings().css({
			"color": "rgba(255, 255, 255, 0.7)",
   			"background": "#363e4f",
   			"border-right": "none"
		})
	})
	
});