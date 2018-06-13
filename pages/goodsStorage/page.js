(function() {

var Page = function() {
    this.data = {
        category: "",
        coding: "",
        date: "",
        image: "",
        name: "",
        number: 0,
        price: 0,
    };
}
Page.prototype = {
    init: function() {
        var _this = this;
        $('.file-btn').on('change', function(e) {
            _this.readAsDataURL();
        });
        $('#submit-btn').on('click', function(e) {
            _this.submitHandle();
        });
        $('#reset-btn').on('click', function(e) {
            _this.resetHandle();
        });


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
    setData: function() {
        this.data.category = $.trim($('#category').val());
        this.data.coding = $.trim($('#coding').val());
        this.data.date = $.trim($('#date').val());
        this.data.name = $.trim($('#name').val());
        this.data.number = $.trim($('#number').val());
        this.data.price = $.trim($('#price').val());
    },
    // 格式验证
    isValidate: function() {
        return true;
    },
    // 登录验证
    isPass: function() {},
    submitHandle: function() {
        var _this = this;
        this.setData();
        if (this.isValidate()) {
            store.addNewGoods(state, _this.data);
            var oneShopDB = null;
            shopDB.openDB('oneShopDB', 1, oneShopDB, {
                name: 'oneShop',
                key: 'name'
            }, function(db) {
                var oneShopDB = db;
                shopDB.putData(oneShopDB, 'oneShop', [state.goods]);
                alert('提交成功');
            });

        } else {
            return false;
        }
    },
    resetHandle: function() {
        $('#category').val('');
        $('#coding').val('');
        $('#date').val('');
        $('#name').val('');
        $('#number').val('');
        $('#price').val('');
        $('#img-preview').css('background', '');

    },
}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();