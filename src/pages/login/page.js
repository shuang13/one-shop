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
        this.created();
        $('#submit-btn').on('click', function(e) {
            _this.submitHandle();
        });
        console.log('state:', state);
    },
    // 本地存储数据库IdexedDB
    created: function() {
        var oneShopDB = null;
        // 打开shopDB数据库
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.getData(oneShopDB, 'oneShop', 'users', function(result) {
                if (result) {
                    var data = new Object();

                    data.name = 'users';
                    data.result = result;
                    store.getData(state, data);
                } else {
                    var users = {
                        name: 'users',
                        userList: [{
                            name: 'Admin',
                            coding: '000',
                            position: '管理员',
                            password: 'admin',
                            jurisdiction: '一级',
                            telephone: '###########',
                            address: '############',
                            avatar: 'http://img.qq1234.org/uploads/allimg/150128/20123A027-5.jpg'
                        }]
                    };
                    shopDB.putData(oneShopDB, 'oneShop', [users]);
                }

            });
            shopDB.getData(oneShopDB, 'oneShop', 'goods', function(result) {
                if (result) {
                    var data = new Object();
                    data.name = 'goods';
                    data.result = result;
                    store.getData(state, data);
                    setTimeout(function() {
                        // 检查商品保质期
                        store.getData(state, 'checkGoodsDate');
                    }, 0);
                } else {
                    var goods = {
                        name: 'goods',
                        detailGoods: {},
                        goodsList: []
                    };

                    shopDB.putData(oneShopDB, 'oneShop', [goods]);
                }
            });
            shopDB.getData(oneShopDB, 'oneShop', 'shoppingCart', function(result) {
                if (result) {
                    var data = new Object();
                    data.name = 'shoppingCart';
                    data.result = result;
                    store.getData(state, data);
                } else {
                    var shoppingCart = {
                        name: 'shoppingCart',
                        number: 0,
                        shoppingCartList: []
                    };
                    shopDB.putData(oneShopDB, 'oneShop', [shoppingCart]);
                }
            });
            shopDB.getData(oneShopDB, 'oneShop', 'cashRegister', function(result) {
                if (result) {
                    var data = new Object();
                    data.name = 'cashRegister';
                    data.result = result;
                    store.getData(state, data);
                } else {
                    var cashRegister = {
                        name: 'cashRegister',
                        cashRegisterList: []
                    };
                    shopDB.putData(oneShopDB, 'oneShop', [cashRegister]);
                }
            });
            shopDB.getData(oneShopDB, 'oneShop', 'messages', function(result) {
                if (result) {
                    var data = new Object();
                    data.name = 'messages';
                    data.result = result;
                    store.getData(state, data);
                } else {
                    var today = utils.getDate();
                    var messages = {
                        name: 'messages',
                        today: today,
                        number: 0,
                        limitDate: 30,
                        limitNumber: 3,
                        messageList: []
                    };
                    shopDB.putData(oneShopDB, 'oneShop', [messages]);
                }
            });
            shopDB.getData(oneShopDB, 'oneShop', 'todo', function(result) {
                if (result) {
                    var data = new Object();
                    data.name = 'todo';
                    data.result = result;
                    store.getData(state, data);
                    setTimeout(function() {
                        for (var i = 0, len = state.todo.todoList.length; i < len; i++) {
                            if (state.todo.todoList[i].state === '待完成') {
                                var timer = null;
                                var content = state.todo.todoList[i].content;
                                var time = state.todo.todoList[i].time;
                                var planTime = new Date(state.todo.todoList[i].time).getTime();
                                timer = setInterval(function() {
                                    console.log(state.todo.todoList[i]);
                                    var newTime = new Date().getTime();
                                    if (planTime - newTime <= 0) {
                                        _this.$store.commit('changeTodoState', time);
                                        var oneShopDB = null;
                                        shopDB.openDB('oneShopDB', 1, oneShopDB, {
                                            name: 'oneShop',
                                            key: 'name'
                                        }, function(db) {
                                            var oneShopDB = db;
                                            shopDB.putData(oneShopDB, 'oneShop', [state.todo]);
                                        });
                                        // $Notice.warning({
                                        //     title: '待办事件提醒',
                                        //     desc: content,
                                        //     duration: 0
                                        // });
                                        clearInterval(timer);
                                    }
                                }, 1000);
                            }
                        }
                    }, 0);
                } else {
                    var todo = {
                        name: 'todo',
                        todoList: []
                    };
                    shopDB.putData(oneShopDB, 'oneShop', [todo]);
                }
            });
        });

    },
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
            return true;
        } else {
            alert('登录失败，密码错误');
        }
        return false;
    },
    submitHandle: function() {
        this.setData();
        if (this.isValidate() && this.isPass()) {
            alert('登录成功')
            utils.jumpUrl('../home/home.html');
        } else {
            return false;
        }
    }

};
var page = new Page();
page.init();

})()