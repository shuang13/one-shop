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
    // 当前用户退出登录
    logoutAccount(state) {
        state.currUser = {
            name: '未登录',
            avatar: ''
        };
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
    // 快捷入库
    addOldGoods(state, goods) {
        const goodsList = state.goods.goodsList;
        for (let i = 0, len = goodsList.length; i < len; i++) {
            if (goodsList[i].coding === goods.coding) {
                goodsList[i].number = parseInt(goodsList[i].number, 10) + parseInt(goods.number, 10);
                goodsList[i].date = goods.date;
            }
        }
    },
    // 详情页商品
    getDetailGoods(state, goods) {
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding == goods.coding) {
                state.goods.detailGoods = state.goods.goodsList[i];
            }
        }
    },
    // 根据商品编码查找
    getByCoding(state, coding) {
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding == coding) {
                return state.goods.goodsList[i];
            }
        }
    },
    // 删除商品
    deleteGoods(state) {
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === state.goods.detailGoods.coding) {
                state.goods.goodsList.splice(i, 1);
                break;
            }
        }
    },
    // 更改商品信息
    changeGoods(state, newMessage) {
        let goods = null;
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            if (state.goods.goodsList[i].coding === state.goods.detailGoods.coding) {
                goods = state.goods.goodsList[i];
                break;
            }
        }
        for (let message in newMessage) {
            if (newMessage[message]) {
                goods[message] = newMessage[message];
            }
        }
    },
    // 筛选商品
    searchGoods(state, search) {
        state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
            if (goods.name.includes(search) || goods.coding.includes(search)) {
                return goods;
            }
        });
    },
    categoryGoods(state, category) {
        switch (category) {
        case 'allgoods':
            state.filterGoodsList = state.goods.goodsList;
            break;
        case 'snacks':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '休闲零食') {
                    return goods;
                }
            });
            break;
        case 'drink':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '酒水饮料') {
                    return goods;
                }
            });
            break;
        case 'food':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '粮油副食') {
                    return goods;
                }
            });
            break;
        case 'fruit':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '生鲜水果') {
                    return goods;
                }
            });
            break;
        case 'toiletries':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '日常洗护') {
                    return goods;
                }
            });
            break;
        case 'kitchen':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '厨卫用品') {
                    return goods;
                }
            });
            break;
        case 'another':
            state.filterGoodsList = state.goods.goodsList.filter(function(goods) {
                if (goods.category === '其它品类') {
                    return goods;
                }
            });
            break;
        default:
            break;
        }
    },
    sortGoods(state, sort) {
        switch (sort) {
        case 'defualtTab':
            state.filterGoodsList = state.goods.goodsList;
            break;
        case 'priceTab':
            state.filterGoodsList = state.goods.goodsList.sort(function(a, b) {
                return b.price - a.price;
            });
            break;
        case 'salesTab':
            state.filterGoodsList = state.goods.goodsList.sort(function(a, b) {
                let nowMonth = new Date().getMonth();
                return b.sales[nowMonth] - a.sales[nowMonth];
            });
            break;
        case 'numberTab':
            state.filterGoodsList = state.goods.goodsList.sort(function(a, b) {
                return b.number - a.number;
            });
            break;
        default:
            break;
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
            for (let z = 0, len = state.goods.goodsList.length; z < len; z++) {
                if (goodsList[i].coding === state.goods.goodsList[z].coding) {
                    state.goods.goodsList[z].number -= count[i];

                    state.goods.goodsList[z].sales[new Date().getMonth()] += count[i];
                    // 重置新消息提醒
                    state.messages.messageList.forEach(element => {
                        element.cellClassName = '';
                    });
                    // 检查商品库存
                    if (state.goods.goodsList[z].number <= state.messages.limitNumber) {
                        let message = new Object();
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        let hour = date.getHours();
                        let min = date.getMinutes();

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
                        let oneShopDB = null;
                        shopDB.openDB('oneShopDB', 1, oneShopDB, {
                            name: 'oneShop',
                            key: 'name'
                        }, function(db) {
                            let oneShopDB = db;
                            shopDB.putData(oneShopDB, 'oneShop', [state.messages]);
                        });
                    }
                }
            }
        }
    },
    // 检查商品库存
    checkGoodsNumber(state) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();

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
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {

            if (state.goods.goodsList[i].number <= 10) {
                let message = new Object();
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
        let oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            let oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.messages]);
        });
    },
    // 检查商品保质期
    checkGoodsDate(state) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();

        function addZero(val) {
            if (val < 10) {
                val = '0' + val;
            }
            return val;
        }
        let today = year + '-' + addZero(month) + '-' + addZero(day);
        // 重置新消息提醒
        state.messages.messageList.forEach(element => {
            element.cellClassName = '';
        });
        for (let i = 0, len = state.goods.goodsList.length; i < len; i++) {
            let goodsTime = state.goods.goodsList[i].date;
            goodsTime = goodsTime.split("-")[0] + goodsTime.split("-")[1] + goodsTime.split("-")[2];
            var nowTime = today.split("-")[0] + today.split("-")[1] + today.split("-")[2];
            let dateRange = goodsTime - nowTime;
            if (dateRange <= 10) {
                let message = new Object();
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
        let oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            let oneShopDB = db;
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
        for (let limit in newLimit) {
            if (newLimit[limit]) {
                state.messages[limit] = newLimit[limit];
            }
        }
    },
    // 提交收银记录
    addCashRegister(state, cashRegiter) {
        state.cashRegister.cashRegisterList.unshift(cashRegiter);
    },
    // 添加新待办事件
    addNewTodo(state, todo) {
        state.todo.todoList.unshift(todo);
    },
    // 删除待办事件
    deleteTodo(state, index) {
        state.todo.todoList.splice(index, 1);
    },
    // 改变待办事件状态
    changeTodoState(state, time) {
        for (let i = 0, len = state.todo.todoList.length; i < len; i++) {
            if (state.todo.todoList[i].time === time) {
                state.todo.todoList[i].state = '已到期';
                state.todo.todoList[i].cellClassName = {
                    state: 'state-change'
                };
            }
        }
    }
};
var store = new Store();