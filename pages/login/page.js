(function() {

var Page = function() {
    this.data = {
        username: '',
        password: '',
    };
}
Page.prototype = {
    init: function() {
        var _this = this;
        oState.init();
        $('#submit-btn').on('click', function(e) {
            _this.submitHandle();
        });
    },
    // 本地存储数据库IdexedDB

    setData: function() {
        this.data.username = $.trim($('#username').val());
        this.data.password = $.trim($('#password').val());
    },
    // 格式验证
    isValidate: function() {
        if ($.trim(this.data.username) == '') {
            alert("提示！用户名不能为空！");
            return false;
        }
        if ($.trim(this.data.password) == '') {
            alert("提示！密码不能为空！");
            return false;
        }
        return true;
    },
    // 登录验证
    isPass: function() {
        for (var i = 0; i < state.users.userList.length; i++) {
            var name = state.users.userList[i].name;
            var password = state.users.userList[i].password;
            if (this.data.username == name) {

                break;
            } else {
                alert('该用户名不存在！');
                return false;
            }
        }
        if (this.data.password == password) {
            state.currUser.user = this.data.username;
            state.currUser.avatar = state.users.userList[i].avatar;
            return true;
        } else {
            alert('登录失败，密码错误');
        }
        return false;
    },
    submitHandle: function() {
        this.setData();
        if (this.isValidate() && this.isPass()) {
            // 更新数据库
            var oneShopDB = null;
            shopDB.openDB('oneShopDB', 1, oneShopDB, {
                name: 'oneShop',
                key: 'name'
            }, function(db) {
                var oneShopDB = db;
                shopDB.putData(oneShopDB, 'oneShop', [state.currUser]);
                alert('登录成功');
                utils.jumpUrl('./pages/goodsList/index.html');
            });

        } else {
            return false;
        }
    },
};
var page = new Page();
page.init();

})()