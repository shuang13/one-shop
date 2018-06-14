$(document).ready(function() {
    function loginUser() {
        var user = state.currUser.user;
        var userImg = state.currUser.avatar;
        console.log(user)
        if (user == '' || typeof (user) == 'undefined') {

            $(".person").mouseover(function() {
                $(".change-acount").css("display", "block");
            });
            $(".person").mouseout(function() {
                $(".change-acount").css("display", "none");
            });
            $('#login-state').html('未登录');
            alert('请登录');
            utils.jumpUrl('../../index.html');
        } else {
            $('#login-state').html(user);
            $('.avatar-circle').html('<img id="user-img" src="" alt="">');
            $('#user-img').attr('src', userImg);

        }
    }

    function shopCart() {
        var number = state.shoppingCart.number;
        var messages = state.messages.number;
        if (number > 0) {
            $('#cart-count').html(number);
            $('#cart-count').removeClass('hidden');
        } else {
            $('#cart-count').html(number);
            $('#cart-count').addClass('hidden');
        }
        if (messages > 0) {
            $('#message-count').html(messages);
            $('#message-count').removeClass('hidden');
        } else {
            $('#message-count').html(messages);
            $('#message-count').addClass('hidden');
        }
    }

    var r = 0;
    $(".sub-menu").click(function() {
        console.log(r);

        $(".sub-menu-item").slideToggle(function() {
            r += 180;
            $(".jiantou1").css("transform", "rotate(" + r + "deg)");
        });

    });
    setTimeout(function() {
        loginUser();
        shopCart();

    }, 500);

});