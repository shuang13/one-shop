(function() {

var Page = function() {
    this.data = {
        coding: "",
        image: "",
        name: "",
        price: "",
        number: "",
    };
    this.list = [];
}
Page.prototype = {
    init: function() {

        var _this = this;
        _this.render();
        $('#goods-list').on('click', function(e) {
            if (e.target.className == 'cover') {
                _this.btnHandler(e.target);
            }
        })

    },
    btnHandler: function(ele) {
        var _this = this;
        // 根据商品编码查询
        var coding = $(ele).attr('data-id');
        var goods = store.getByCoding(state, coding);
        // 添加到购物车
        store.addShoppingCart(state, goods);

        // 更新数据库
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.shoppingCart]);
            _this.shopCartUpdate();
        });
    },
    shopCartUpdate: function() {
        var number = state.shoppingCart.number;
        if (number > 0) {
            $('#cart-count').html(number);
            $('#cart-count').removeClass('hidden');
        } else {
            $('#cart-count').html(number);
            $('#cart-count').addClass('hidden');
        }
    },
    render: function() {
        var str = '';
        this.list = state.goods.goodsList;
        for (var i = 0; i < this.list.length; i++) {
            str += '<div class="goods-item" title="加入购物车" >' +
                '<div class="cover" data-id="' + this.list[i].coding + '"></div>' +
                '<div class="inner">' +
                '<img src="' + this.list[i].image + '" alt="">' +
                '<p class="goods-name">' + this.list[i].name + '</p>' +
                '<div class="inner-bottom">' +
                '<span class="goods-price">￥' + this.list[i].price + '</span>' +
                '<span class="goods-num">库存' + this.list[i].number + '</span>' +
                '</div>' +
                '</div>' +
                '</div>';
        }
        $('#goods-list').html(str);
    },
    setData: function() {},

}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();