(function() {

var Page = function() {
    this.data = {
        coding: "",
        name: "",
    };
    this.list = [];
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

    },
    btnHandler: function(ele) {
        utils.jumpUrl('../goodsDetail/index.html?coding=' + $(ele).attr('data-id'));
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["商品编码", "商品名称", "商品操作"],
            data: this.list,
        });
        sortTable.init();
    },
    setData: function() {
        var goods = state.goods.goodsList;
        for (var i = 0; i < goods.length; i++) {
            this.list[i] = [goods[i]['coding'],
                goods[i]['name'],
                '<button class="btn orange-btn" data-id=' + goods[i]['coding'] + '>查看详情</button>'
            ];
        }
    },

}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();