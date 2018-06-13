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
                if (e.target.className == 'btn orange-btn') {
                    _this.modifyHandler(e.target);
                } else if (e.target.className == 'btn red-btn') {
                    _this.deleteHandler(e.target);

                }
            }
        })

    },
    modifyHandler: function(ele) {
        var _this = this;
        var popContext = '<div class="form-item">' +
            '<label class="form-label">商品编码</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="coding">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">商品名称</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="name">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">商品单价</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="price">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">商品数量</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="number">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">商品分类</label>' +
            '<div class="form-input-wrapper">' +
            '<select class="form-input input-select" name="" id="category">' +
            '<option value="休闲零食">休闲零食</option>' +
            '<option value="酒水饮料">酒水饮料</option>' +
            '<option value="粮油副食">粮油副食</option>' +
            '<option value="新鲜水果">新鲜水果</option>' +
            '<option value="其他品类">其他品类</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">保质期</label>' +
            '<div class="form-input-wrapper">' +
            '<i class="fa fa-calendar-o" aria-hidden="true"></i>' +
            '<input class="form-input" id="date">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">商品图片</label>' +
            '<div class="form-input-wrapper">' +
            '<i class="fa fa-upload" aria-hidden="true"></i>' +
            '<div class="form-input">选择商品图片' +
            '<input class="file-btn" type="file">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<div class="img-preview" id="img-preview"></div>' +
            '</div>';
        $.popUp({
            title: "修改商品",
            context: popContext,
        }, function() {
            _this.data.category = $.trim($('#category').val());
            _this.data.coding = $.trim($('#coding').val());
            _this.data.date = $.trim($('#date').val());
            _this.data.name = $.trim($('#name').val());
            _this.data.number = $.trim($('#number').val());
            _this.data.price = $.trim($('#price').val());

            store.addNewGoods(state, _this.data);

            // 更新数据库
            var oneShopDB = null;
            shopDB.openDB('oneShopDB', 1, oneShopDB, {
                name: 'oneShop',
                key: 'name'
            }, function(db) {
                var oneShopDB = db;
                shopDB.putData(oneShopDB, 'oneShop', [state.goods]);
                alert('提交成功！');
            });
        }, function() {
            $('.file-btn').on('change', function(e) {
                _this.readAsDataURL();
            });
        });
    },
    deleteHandler: function(ele) {
        store.deleteGoods(state);
        state.goods.detailGoods = {};
        // 更新数据库
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.goods]);
            alert('提交成功');
        });
        console.log(2)
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
            '<button class="btn orange-btn" data-id=' + this.goods['coding'] + '>修改</button>' +
            '<button class="btn red-btn" data-id=' + this.goods['coding'] + '>删除</button>'
        ]
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