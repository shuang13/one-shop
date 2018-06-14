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
    setData: function() {
        var cashRegister = state.cashRegister.cashRegisterList;

        for (var i = 0; i < cashRegister.length; i++) {
            this.list[i] = [cashRegister[i]['time'],
                cashRegister[i]['cashier'],
                cashRegister[i]['allCount'],
                cashRegister[i]['allTotal'],
                cashRegister[i]['mode'],
            ];
        }
    },

}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();