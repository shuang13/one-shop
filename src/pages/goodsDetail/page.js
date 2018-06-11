(function() {

var Page = function() {
    this.data = {
        image: "",
        name: "",
        coding: "",
        price: 0,
        number: 0,
        category: "",
        date: "",
    };
    this.list = [];
    this.goods = [];
}
Page.prototype = {
    init: function() {

        var _this = this;
        _this.setData();
        _this.drawTable();

        $('#sortTable').on('click', function(e) {
            if (e.target.nodeName === 'BUTTON') {
                _this.btnHandler(e.target);
            }
        })
        console.log(utils.getUrlParam())

    },
    btnHandler: function(ele) {
        console.log($(ele).attr('data-id'));
        utils.jumpUrl('../goodsDetail/index.html?coding=' + $(ele).attr('data-id'));
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["商品图片", "商品名称", "商品编码", "商品单价", "商品数量", "商品分类",
                "商品保质期", "操作",
            ],
            data: [this.list],
        });
        sortTable.init();
    },
    setData: function() {
        var _this = this;
        this.data.coding = utils.getUrlParam();
        store.getDetailGoods(state, _this.data);
        this.goods = state.goods.detailGoods;
        console.log(this.goods)
        this.list = ['<img src="' + this.goods['image'] + '">',
            this.goods['name'],
            this.goods['coding'],
            this.goods['price'],
            this.goods['number'],
            this.goods['category'],
            this.goods['date'],
            '<button class="btn orange-btn" data-id=' + this.goods['coding'] + '>修改</button>'
        ]
    },

}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();