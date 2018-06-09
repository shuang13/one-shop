(function() {
utils.loadJs('../../indexedDB/indexedDB.js', function() {
    var page = new Page();
    page.init();
});

var Page = function() {
    this.data = {
        username: '',
        password: '',
    };
}
Page.prototype = {
    init: function() {
        this.created();
    },
    created: function() {
        console.log(shopDB);
    // 本地存储数据库IdexedDB
    // 打开IndexedDB数据库
    },
    setData: function() {
        this.data.username = $('#username').val();
        this.data.username = $('#password').val();
    },
    validate: function() {},

};

})()