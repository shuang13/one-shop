(function() {

var Page = function() {
    this.data = {

    };
    this.list = [];
    this.messages = [];
}
Page.prototype = {
    init: function() {
        var _this = this;
        _this.setData();
        _this.drawTable();
        $('#sortTable').on('click', function(e) {
            if (e.target.nodeName === 'BUTTON') {
                _this.deleteHandler(e.target);
            }
        })
    },

    deleteHandler: function(ele) {
        var index = $(ele).attr('data-id');

        state.messages.number -= 1;
        store.deleteMessage(state, index);
        // 更新数据库
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.messages]);
            alert('删除成功');
            utils.jumpUrl('./index.html', 500);
        });
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["日期", "详情", "操作",],
            data: this.list,
        });
        sortTable.init();
    },
    setData: function() {
        var _this = this;
        this.messages = state.messages.messageList;

        for (var i = 0; i < this.messages.length; i++) {
            this.list[i] = [
                this.messages[i]['date'],
                this.messages[i]['content'],
                '<button class="btn red-btn" data-id=' + i + '>删除</button>'
            ];
        }
    },
    readAsDataURL: function() {
        var _this = this;
        // 检查是否为图像类型  
        var simpleFile = $('.file-btn')[0].files[0];
        if (!/image\/\w+/.test(simpleFile.type)) {
            alert("请确保文件类型为图像类型");
            return false;
        }
        var reader = new FileReader();
        // 将文件以Data URL形式进行读入页面  
        reader.readAsDataURL(simpleFile);
        reader.onload = function(e) {
            _this.data.image = this.result;
            $('#img-preview').css({
                'background': 'url(' + this.result + ') ',
                'background-size': '200px 200px',
            });
        }
    },
}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();