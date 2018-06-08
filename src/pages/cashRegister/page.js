(function() {
var aqiData = {};

function addAqiData() {

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 删除数据，更新表格显示
 */
function delBtnHandle(city) {
}

function init() {

    // add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    // aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
})()