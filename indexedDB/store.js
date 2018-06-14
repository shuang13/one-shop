var Store = function() {}
Store.prototype = {
    // 将shopDB中数据写入store
    getData(state, data) {
        state[data.name] = data.result;
    },
    // 设置当前用户
    setCurrUser(state, user) {
        state.currUser = user;
    },
    // 添加新用户
    addNewUser(state, user) {
        state.users.userList.push(user);
    },
    // 删除用户
    deleteUser(state, index) {
        if (state.users.userList[index].coding !== '000') {
            state.users.userList.splice(index, 1);
        }
    },
    // 新商品入库
    addNewGoods(state, goods) {
        state.goods.goodsList.push(goods);
    },

    // 详情页商品
    getDetailGoods(state, goods) {
        for (var i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding == goods.coding) {
                state.goods.detailGoods = state.goods.goodsList[i];
            }
        }
    },
    // 根据商品编码查找
    getByCoding(state, coding) {
        for (var i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding == coding) {
                return state.goods.goodsList[i];
            }
        }
    },
    // 删除商品
    deleteGoods(state) {
        for (var i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === state.goods.detailGoods.coding) {
                state.goods.goodsList.splice(i, 1);
                break;
            }
        }
    },
    // 更改商品信息
    changeGoods(state, newMessage) {
        var goods = null;
        for (var i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === state.goods.detailGoods.coding) {
                goods = state.goods.goodsList[i];
                break;
            }
        }
    },

    // 添加商品到购物车
    addShoppingCart(state, goods) {
        state.shoppingCart.shoppingCartList.push(goods);
        state.shoppingCart.number += 1;
    },
    // 删除购物车商品
    deleteShoppingCart(state, index) {
        state.shoppingCart.shoppingCartList.splice(index, 1);
        state.shoppingCart.number -= 1;
    },
    // 删除已结算商品，同时减去库存，加上销量
    deleteCheckoutGoods(state, goodsList, count) {
        for (var i = 0, len = goodsList.length; i < len; i++) {
            for (var j = state.shoppingCart.shoppingCartList.length - 1; j >= 0; j--) {
                if (goodsList[i].coding === state.shoppingCart.shoppingCartList[j].coding) {
                    state.shoppingCart.shoppingCartList.splice(j, 1);
                    state.shoppingCart.number -= 1;
                }
            }
            for (var z = 0, len = state.goods.goodsList.length; z < len; z++) {
                if (goodsList[i].coding === state.goods.goodsList[z].coding) {
                    state.goods.goodsList[z].number -= count[i];

                    state.goods.goodsList[z].sales[new Date().getMonth()] += count[i];
                    // 重置新消息提醒
                    state.messages.messageList.forEach(element => {
                        element.cellClassName = '';
                    });
                    // 检查商品库存
                    if (state.goods.goodsList[z].number <= state.messages.limitNumber) {
                        var message = new Object();
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        var hour = date.getHours();
                        var min = date.getMinutes();

                        function addZero(val) {
                            if (val < 10) {
                                val = '0' + val;
                            }
                            return val;
                        }
                        message.cellClassName = {
                            date: 'new-message'
                        };
                        message.date = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
                        message.content = '商品：' + state.goods.goodsList[z].name + '，编码：' + state.goods.goodsList[z].coding + '，仅剩 ' + state.goods.goodsList[z].number + ' 件，请尽快补充！';
                        state.messages.messageList.unshift(message);
                        state.messages.number += 1;
                        var oneShopDB = null;
                        shopDB.openDB('oneShopDB', 1, oneShopDB, {
                            name: 'oneShop',
                            key: 'name'
                        }, function(db) {
                            var oneShopDB = db;
                            shopDB.putData(oneShopDB, 'oneShop', [state.messages]);
                        });
                    }
                }
            }
        }
    },
    // 检查商品库存
    checkGoodsNumber(state) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();

        function addZero(val) {
            if (val < 10) {
                val = '0' + val;
            }
            return val;
        }
        // 重置新消息提醒
        state.messages.messageList.forEach(element => {
            element.cellClassName = '';
        });
        for (var i = 0, len = state.goods.goodsList.length; i < len; i++) {

            if (state.goods.goodsList[i].number <= 10) {
                var message = new Object();
                message.cellClassName = {
                    date: 'new-message'
                };
                message.date = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(min);
                message.content = '商品：' + state.goods.goodsList[i].name + '，编码：' + state.goods.goodsList[i].coding + '，仅剩 ' + state.goods.goodsList[i].number + ' 件，请尽快补充！';
                state.messages.messageList.unshift(message);
                state.messages.number += 1;
                console.log(message)

            }
        }
        state.messages.today = year + '-' + addZero(month) + '-' + addZero(day);
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.messages]);
        });
    },
    // 检查商品保质期
    checkGoodsDate(state) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();

        function addZero(val) {
            if (val < 10) {
                val = '0' + val;
            }
            return val;
        }
        var today = year + '-' + addZero(month) + '-' + addZero(day);
        // 重置新消息提醒
        state.messages.messageList.forEach(element => {
            element.cellClassName = '';
        });
        for (var i = 0, len = state.goods.goodsList.length; i < len; i++) {
            var goodsTime = state.goods.goodsList[i].date;
            goodsTime = goodsTime.split("-")[0] + goodsTime.split("-")[1] + goodsTime.split("-")[2];
            var nowTime = today.split("-")[0] + today.split("-")[1] + today.split("-")[2];
            var dateRange = goodsTime - nowTime;
            if (dateRange <= 10) {
                var message = new Object();
                message.cellClassName = {
                    date: 'new-message'
                };
                message.date = today + ' ' + addZero(hour) + ':' + addZero(min);
                if (dateRange > 0) {
                    message.content = '商品：' + state.goods.goodsList[i].name + '，编码：' + state.goods.goodsList[i].coding + '，保质期仅剩 ' + dateRange + ' 天，请尽快销售或处理！';
                } else {
                    message.content = '商品：' + state.goods.goodsList[i].name + '，编码：' + state.goods.goodsList[i].coding + '，已过期，请立即下架处理！';
                }
                state.messages.messageList.unshift(message);
                state.messages.number += 1;
            }
        }
        state.messages.today = today;
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.messages]);
        });
    },
    // 重置新消息数字
    resetMessageNumber(state) {
        state.messages.number = 0;
    },
    // 删除消息通知
    deleteMessage(state, index) {
        state.messages.messageList.splice(index, 1);
    },
    // 设置消息通知
    changeMessage(state, newLimit) {
        for (var limit in newLimit) {
            if (newLimit[limit]) {
                state.messages[limit] = newLimit[limit];
            }
        }
    },
    // 提交收银记录
    addCashRegister(state, cashRegiter) {
        state.cashRegister.cashRegisterList.unshift(cashRegiter);
    },
};
var store = new Store();