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
        });
        $('#add-user').on('click', function(e) {
            _this.addUserHandler(e.target);
        });


    },
    btnHandler: function(ele) {
        // 根据商品编码查询
        var index = $(ele).attr('data-id');
        // 从购物车删除
        store.deleteUser(state, index);

        // 更新数据库
        var oneShopDB = null;
        shopDB.openDB('oneShopDB', 1, oneShopDB, {
            name: 'oneShop',
            key: 'name'
        }, function(db) {
            var oneShopDB = db;
            shopDB.putData(oneShopDB, 'oneShop', [state.users]);
            alert('删除成功');

        });
    },
    addUserHandler: function(ele) {
        var _this = this;
        var popContext = '<div class="form-item">' +
            '<label class="form-label">员工姓名</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="name">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">员工工号</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="coding">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">员工职位</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="position">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">登录密码</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="password">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">确认登录密码</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="comfrim-password">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">权限设置</label>' +
            '<div class="form-input-wrapper">' +
            '<select class="form-input input-select" name="jurisdiction" id="jurisdiction">' +
            '<option value="一级">一级</option>' +
            '<option value="二级">二级</option>' +
            '<option value="三级">三级</option>' +
            '</select>' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">联系电话</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="telephone">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">家庭住址</label>' +
            '<div class="form-input-wrapper">' +
            '<input class="form-input" type="text" id="address">' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<label class="form-label">头像设置</label>' +
            '<div class="form-input-wrapper">' +
            '<i class="fa fa-upload" aria-hidden="true"></i>' +
            '<div class="form-input">选择用户头像' +
            '<input class="file-btn" type="file">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form-item">' +
            '<div class="img-preview" id="img-preview"></div>' +
            '</div>';
        $.popUp({
            title: "添加员工",
            context: popContext,
        }, function() {
            _this.data.name = $('#name').val();
            _this.data.position = $('#position').val();
            _this.data.coding = $('#coding').val();
            _this.data.jurisdiction = $('#jurisdiction').val();
            _this.data.telephone = $('#telephone').val();
            _this.data.address = $('#address').val();
            _this.data.password = $('#password').val();
            console.log(_this.data)
            store.addNewUser(state, _this.data);

            // 更新数据库
            var oneShopDB = null;
            shopDB.openDB('oneShopDB', 1, oneShopDB, {
                name: 'oneShop',
                key: 'name'
            }, function(db) {
                var oneShopDB = db;
                shopDB.putData(oneShopDB, 'oneShop', [state.users]);
                alert('提交成功！');
            });
        }, function() {
            $('.file-btn').on('change', function(e) {
                _this.readAsDataURL();
            });
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
            _this.data.avatar = this.result;
            $('#img-preview').css({
                'background': 'url(' + this.result + ') ',
                'background-size': '200px 200px',
            });
        }
    },
    drawTable: function() {
        var sortTable = new SortTable({
            ele: document.getElementById('sortTable'),
            title: ["姓名", "职位", "工号", "权限", "联系电话", "家庭住址", "操作"],
            data: this.list,
        });
        sortTable.init();
    },
    setData: function() {
        var users = state.users.userList;

        for (var i = 0; i < users.length; i++) {
            this.list[i] = [users[i]['name'],
                this.list[i] = users[i]['position'],
                this.list[i] = users[i]['coding'],
                this.list[i] = users[i]['jurisdiction'],
                this.list[i] = users[i]['telephone'],
                this.list[i] = users[i]['address'],
                '<button class="btn orange-btn" data-id=' + i + '>删除</button>'
            ];
        }
    },

}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();