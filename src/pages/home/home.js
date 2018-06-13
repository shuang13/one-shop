$(document).ready(function() {
    $(".person").mouseover(function() {
        $(".change-acount").css("display", "block");
    });
    $(".person").mouseout(function() {
        $(".change-acount").css("display", "none");
    });
    var r = 0;
    $(".sub-menu").click(function() {
        console.log(r);

        $(".sub-menu-item").slideToggle(function() {
            r += 180;
            $(".jiantou1").css("transform", "rotate(" + r + "deg)");
        });

    });

});