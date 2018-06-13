(function() {

var Page = function() {
    this.data = {};
}
Page.prototype = {
    init: function() {
        var _this = this;
        this.drawChart();

    },
    drawChart: function() {
        var cash = state.cashRegister.cashRegisterList;
        var countByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < cash.length; i++) {
            var month = Number(cash[i].time.split("-")[1]);
            countByMonth[month - 1] += cash[i].allTotal;
        }
        option = {
            title: {
                text: '年度销售额'
            },
            tooltip: {
                trigger: 'axis'
            },
            itemStyle: {
                normal: {
                    color: 'blue',
                }
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',]
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: countByMonth,
                type: 'bar'
            }]
        };
        var myChart = echarts.init(document.getElementById('chartmain'), 'light');

        myChart.setOption(option);
    },
}
var page = new Page();
setTimeout(function() {
    page.init();
}, 500);
})();