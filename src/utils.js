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
};
var utils = new Utils();