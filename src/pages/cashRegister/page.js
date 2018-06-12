(function() {

var Page = function() {
    this.data = {};
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
        console.log($(ele).attr('data-id'));
        utils.jumpUrl('../goodsDetail/index.html?coding=' + $(ele).attr('data-id'));
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["收银时间", "收银员", "合计数量", "收银金额", "付款方式"],
            data: this.list,
        });
        sortTable.init();
        this.eventListener();
    },
    eventListener: function() {},
    setData: function() {
        var goods = state.goods.goodsList;
        console.log(goods)

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