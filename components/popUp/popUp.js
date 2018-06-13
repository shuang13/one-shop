(function($) {
var PopUp = function(options, callback, bindOutEvent) {
    this.defaults = {
        title: "提示",
        context: "",
        footer: '<button class="btn blue-btn comfirm-btn">确认</button><button class="btn white-btn select-btn">取消</button>',
        // width: 250,
        // height: 200,
        // classname: 'selector-box',

    };
    this.template = [
        '<div class="pop-box">',
        '<header>',
        '<p class="pop-title"></p>',
        '<i class="fa fa-times" aria-hidden="true"></i>',
        '</header>',
        '<div class="pop-content"></div>',
        '<footer class="pop-footer"></footer>',
        '</div>',
    ].join('');
    if (callback && (typeof callback === 'function')) {
        this.callback = callback;
    }
    this.popbox = $('<div>');
    this.options = $.extend({}, this.defaults, options);
}
PopUp.prototype = {
    init: function() {
        this.render();
        this.popOpen();



    },
    popOpen: function() {
        if (this.popbox.hasClass('hidden')) {
            this.popbox.removeClass('hidden');
        } else {
            return false;
        }
    },
    popClose: function() {
        this.popbox.addClass('hidden');
    },
    render: function() {
        this.popbox.addClass('pop-bg');
        this.popbox.addClass('hidden');
        this.popbox.html(this.template);
        $('body').append(this.popbox);
        $('.pop-title').html(this.options.title);
        $('.pop-content').html(this.options.context);
        $('.pop-footer').html(this.options.footer);
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('.fa-times').on('click', function() {
            _this.popClose();
        });
        $('.comfirm-btn').on('click', function() {
            _this.btnComfirm();
        });
        $('.select-btn').on('click', function() {
            _this.btnCancel();
        });
    },
    btnComfirm: function() {
        this.popClose();
        this.callback();
    },
    btnCancel: function() {
        this.popClose();
    },

};
var popUp = function(options, callback, bindOutEvent) {
    var popUp = new PopUp(options, callback);
    popUp.init();
    if (bindOutEvent && (typeof bindOutEvent === 'function')) {
        bindOutEvent();
    }
    return popUp;
}
$.extend({
    'popUp': popUp,
});
})(jQuery);