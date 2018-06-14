(function() {

var Page = function() {
    this.data = {
        number: 0,
        sum: 0,
    };
    this.list = [];
    this.buyNum = [];
    this.goods = [];
    this.cashList = {};
}
Page.prototype = {
    init: function() {

        var _this = this;
        for (var i = 0; i < state.shoppingCart.number; i++) {
            this.buyNum[i] = 1;
        }
        _this.setData();
        _this.drawTable();
        $('#sortTable').on('input', function(e) {
            if (e.target.nodeName === 'INPUT') {
                _this.changeHandler(e.target);
                $('#count-btn').on('click', function(e) {
                    _this.countHandler();

                });

            }
        });

        $('#sortTable').on('click', function(e) {
            if (e.target.nodeName === 'BUTTON') {
                _this.btnHandler(e.target);
            }
        });
        $('#count-btn').on('click', function(e) {
            _this.countHandler();

        });



    },
    changeHandler: function(ele) {
        var index = $(ele).attr('data-index');
        // 验证输入为0以上的整数，之后来改
        if (!isNaN($(ele).val())) {
            this.buyNum[index] = $(ele).val();
            this.setData();
            this.drawTable();
        } else {
            $(ele).val(1);
            alert("请输入数字！");
        }

    },
    btnHandler: function(ele) {
        // 根据商品编码查询
        var index = $(ele).attr('data-index');
        // 从购物车删除
        store.deleteShoppingCart(state, index);

        // 更新数据库
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.shoppingCart]);
            alert('删除成功');
            utils.jumpUrl('./index.html');

        });

    },
    // 结算
    countHandler: function() {
        var _this = this;
        for (var i = 0; i < this.goods.length; i++) {
            // 从购物车删除
            for (var j = 0; j < state.goods.goodsList.length; j++) {
                if (this.goods[i].coding == state.goods.goodsList[j].coding) {
                    state.shoppingCart.shoppingCartList = [];
                    state.goods.goodsList[j].number -= this.buyNum[i];
                }
            }
        }
        var popContext = '<div class="form-item">' +
            '<label class="form-label">应收</label>' +
            '<div class="form-input-wrapper" >' +
            '<input class="form-input" type="text" id="yingshou" value="' + _this.data.sum + '">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">实收</label>' +
            '<div class="form-input-wrapper" >' +
            '<input class="form-input" type="text" id="shishou">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">找零</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" id="zhaoling" type="text">' +
            '</div>' +
            '</div>';


        $.popUp({
            title: "商品结算",
            context: popContext,
        }, function() {
            var date = new Date();
            _this.cashList.allCount = _this.data.number;
            _this.cashList.allTotal = _this.data.sum;
            _this.cashList.cashier = 'admin';
            _this.cashList.goodsList = _this.goods;
            _this.cashList.mode = '现金';
            _this.cashList.time = utils.getTime();
            store.addCashRegister(state, _this.cashList);
            // 更新数据库
            var oneShopDB = null;
            shopDB.openDB('oneShopDB', 1, oneShopDB, {
                name: 'oneShop',
                key: 'name'
            }, function(db) {
                var oneShopDB = db;
                state.shoppingCart.number = 0;
                shopDB.putData(oneShopDB, 'oneShop', [state.goods]);
                shopDB.putData(oneShopDB, 'oneShop', [state.cashRegister]);
                shopDB.putData(oneShopDB, 'oneShop', [state.shoppingCart]);
                alert('提交成功!');
                store.checkGoodsNumber(state);
                store.checkGoodsDate(state);
                utils.jumpUrl('./index.html', 500);
            });
        }, function() {
            $("#shishou").on("blur", function() {
                var zhaoling = Number($("#shishou").val()) - Number($("#yingshou").val());
                $("#zhaoling").val(zhaoling);
            });
        });
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["商品名称", "商品单价", "商品数量", "商品金额", "操作"],
            data: this.list,
        });
        sortTable.init();
        $('#count-all').html('<button class="btn red-btn" id="count-btn">确认结算</button>');
    },
    setData: function() {
        this.goods = state.shoppingCart.shoppingCartList;
        var goods = this.goods;
        var number = 0;
        var sum = 0;
        for (var i = 0; i < goods.length; i++) {
            this.list[i] = [goods[i]['name'],
                goods[i]['price'],
                '<input data-index="' + i + '" class="form-input buy-num" type="text" value=' + this.buyNum[i] + '>',
                goods[i]['price'] * this.buyNum[i],

                '<button class="btn red-btn" data-index=' + i + '>删除</button>'
            ];
            number += Number(this.buyNum[i]);
            sum += Number(goods[i]['price'] * this.buyNum[i]);
        }
        $('#all-num').html('共' + number + '件');
        $('#all-price').html('合计：' + sum + '元');
        this.data.number = number;
        this.data.sum = sum;
    },

}
var page = new Page();
setTimeout(function() {
    page.init();


}, 500);

})();