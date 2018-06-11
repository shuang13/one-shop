(function() {

var Page = function() {
    this.data = {
        coding: "",
        name: "",
    };
    this.list = [];
    this.buyNum = [];
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
            }
        });
        $('#sortTable').on('click', function(e) {
            if (e.target.nodeName === 'BUTTON') {
                _this.btnHandler(e.target);
            }
        });

    },
    changeHandler: function(ele) {
        var index = $(ele).attr('data-index');
        this.buyNum[index] = $(ele).val();
        this.setData();
        this.drawTable();
    },
    btnHandler: function(ele) {
        // 根据商品编码查询
        var index = $(ele).attr('data-index');
        // 从购物车删除
        store.deleteShoppingCart(state, index)

        // 更新数据库
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.shoppingCart]);
            alert('删除成功');

        });
        setTimeout(function() {
            this.setData();
            this.drawTable();
        }, 500);
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["商品名称", "商品单价", "商品数量", "商品金额", "操作"],
            data: this.list,
        });
        sortTable.init();
    },
    setData: function() {
        var goods = state.shoppingCart.shoppingCartList;
        console.log(goods)

        for (var i = 0; i < goods.length; i++) {
            this.list[i] = [goods[i]['name'],
                goods[i]['price'],
                '<input data-index="' + i + '" class="form-input buy-num" type="text" value=' + this.buyNum[i] + '>',
                goods[i]['price'] * this.buyNum[i],

                '<button class="btn red-btn" data-index=' + i + '>删除</button>'
            ];


        }
    },

}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();