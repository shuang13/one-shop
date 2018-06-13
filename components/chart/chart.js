(function($) {
var Chart = function(options, callback) {
    this.defaults = {
        data: [],
    };
    this.options = $.extend({}, this.defaults, options);
}
Chart.prototype = {
    init: function() {},

};
$.fn.chart = function(options, callback) {
    var canvas = this;
    var chart = new Chart();
}
})(jQuery);