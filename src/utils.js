var Utils = function() {}
Utils.prototype = {
    loadJs: function(url, callback) {
        var domScript = document.createElement('script');
        domScript.src = url;
        callback = callback || function() {};
        domScript.onload = domScript.onreadystatechange = function() {
            if (!this.readyState || 'loaded' === this.readyState || 'compelte' === this.readyState) {
                callback();
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            }
        }
        document.getElementsByTagName('body')[0].appendChild(domScript);
    },
    getDate: function() {
        // 当前时间
        var date = new Date();
        var nowTime = date.getTime();
        var year = date.getFullYear();
        var nowMonth = date.getMonth();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        function addZero(val) {
            if (val < 10) {
                val = '0' + val;
            }
            return val;
        }
        var today = year + '-' + addZero(month) + '-' + addZero(day);
        return today;
    },
    // 地址跳转
    jumpUrl: function(url, time) {
        setTimeout(function() {
            window.location.href = url;
        }, time);
    },
};
var utils = new Utils();