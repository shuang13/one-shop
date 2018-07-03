(function() {

let Page = function() {

    this.list = [];
}
Page.prototype = {
    init: function() {
        this.render();
        $('#goods-list').on('click', e => {
            if (e.target.classList.contains('cover')) {
                this.btnHandler(e.target);
            }
        })
    },
    btnHandler: function(ele) {
        let _this = this;
        // 根据商品编码查询
        let coding = $(ele).attr('data-id');
        let goods = store.getByCoding(state, coding);
        // 添加到购物车
        store.addShoppingCart(state, goods);

        // 更新数据库
        let oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            let oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.shoppingCart]);
            _this.shopCartUpdate();
        });
    },
    shopCartUpdate: function() {
        let number = state.shoppingCart.number;
        $('#cart-count').html(number);
        if (number > 0) {
            $('#cart-count').removeClass('hidden');
        } else {
            $('#cart-count').addClass('hidden');
        }
    },
    render: function() {
        let str = '';
        this.list = state.goods.goodsList;
        for (let i = 0, length = this.list.length; i < length; i++) {
            str += `
            <div class="goods-item" title="加入购物车" >
                <div class="cover" data-id="${this.list[i].coding}"></div>
                <div class="inner">
                    <img src="${this.list[i].image}" alt="">
                    <p class="goods-name">${this.list[i].name}</p>
                    <div class="inner-bottom">
                        <span class="goods-price">￥${this.list[i].price}</span>
                        <span class="goods-num">库存${this.list[i].number}</span>
                    </div>
                </div>
            </div>`;
        }
        $('#goods-list').html(str);
    },
}
const page = new Page();

// 异步问题，以后解决
setTimeout(function() {
    page.init();
}, 500);
})();