(function() {

var SortTable = function(option) {
    this.ele = option.ele;
    this.title = option.title;
    this.data = option.data;
}
SortTable.prototype = {
    init: function(option) {
        $(this.ele).empty();
        this.createTable();
    },
    createTable: function() {
        var str = '';
        var tbody = document.createElement('tbody');
        var ths = document.createElement('tr');
        for (var i = 0; i < this.title.length; i++) {
            var th = document.createElement('th');
            th.innerHTML = this.title[i];
            ths.appendChild(th);
        }
        tbody.appendChild(ths);

        for (var i = 0; i < this.data.length; i++) {
            var tr = document.createElement('tr');
            tr.className = 'data-row';
            for (var j = 0; j < this.title.length; j++) {
                var td = document.createElement('td');
                td.innerHTML = this.data[i][j];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this.ele.appendChild(tbody);
    }
};

window.SortTable = SortTable;
})();