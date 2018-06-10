var State = function() {
    this.data = {
        users: {
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
        },
        // 筛选商品列表
        filterGoodsList: [],
        // 商品列表
        goods: {
            name: 'goods',
            detailGoods: {},
            goodsList: []
        },
        // 购物车列表
        shoppingCart: {
            name: 'shoppingCart',
            number: 0,
            shoppingCartList: []
        },
        // 收银记录列表
        cashRegister: {
            name: 'cashRegister',
            cashRegisterList: []
        },
        // 消息通知列表
        messages: {
            name: 'messages',
            today: '2017-11-12',
            name: 'messages',
            number: 0,
            // 保质期
            limitDate: 30,
            // 库存
            limitNumber: 3,
            messageList: []
        },
        // 待办事件列表
        todo: {
            name: 'todo',
            todoList: []
        },
        // 当前用户
        currUser: {
            name: '未登录',
            avatar: ''
        },
    }
}
State.prototype = {
    init: function() {
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
                                        // _this.$store.commit('changeTodoState', time);
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
    }
};
var oState = new State();
var state = oState.data;