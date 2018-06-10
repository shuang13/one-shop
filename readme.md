## One Shop
一个基于Jq + IndexedDB商店管理系统Web APP

## 目录结构

	├─ src
	│  ├─ assets /静态样式
	│  │  ├─ css 
	│  │  │  ├─ button_item.css
	│  │  │  ├─ button_item_demo.html
	│  │  │  ├─ input_item.css
	│  │  │  └─ input_item_demo.html
	│  │  └─ reset.css
	│  ├─ components /UI控件
	│  │  ├─ calendar /时间选择器
	│  │  │  ├─ calendar.css
	│  │  │  ├─ calendar.js
	│  │  │  └─ demo.html
	│  │  ├─ chart /图表
	│  │  │  ├─ chart.css
	│  │  │  ├─ chart.js
	│  │  │  └─ demo.html
	│  │  ├─ popUp /弹窗
	│  │  │  ├─ demo.html
	│  │  │  ├─ popUp.css
	│  │  │  └─ popUp.js
	│  │  └─ sortTable /表格
	│  │     ├─ demo.html
	│  │     ├─ sortTable.css
	│  │     └─ sortTable.js
	│  ├─ indexedDB /数据库
	│  │  ├─ indexedDB.js /数据库相关操作
	│  │  ├─ state.js /数据存储
	│  │  └─ store.js /数据存储相关操作
	│  ├─ libs /第三方插件
	│  │  ├─ ajaxfileupload /文件上传插件
	│  │  │  ├─ ajaxfileupload.js
	│  │  │  └─ bootstrap-filestyle.min.js
	│  │  ├─ dialog 
	│  │  │  ├─ css
	│  │  │  │  ├─ animate.css
	│  │  │  │  ├─ dialog.css
	│  │  │  │  ├─ global.css
	│  │  │  │  ├─ ie.css
	│  │  │  │  └─ print.css
	│  │  │  ├─ js
	│  │  │  │  └─ dialog.js
	│  │  │  └─ index.html
	│  │  ├─ flatpickr
	│  │  │  ├─ themes
	│  │  │  │  ├─ airbnb.css
	│  │  │  │  ├─ base16_flat.css
	│  │  │  │  ├─ confetti.css
	│  │  │  │  ├─ dark.css
	│  │  │  │  ├─ material_blue.css
	│  │  │  │  ├─ material_green.css
	│  │  │  │  ├─ material_orange.css
	│  │  │  │  └─ material_red.css
	│  │  │  ├─ flatpickr.min.css
	│  │  │  ├─ flatpickr.min.js
	│  │  │  └─ zh.js
	│  │  ├─ font-awesome /图标库
	│  │  │  ├─ css
	│  │  │  │  ├─ font-awesome.css
	│  │  │  │  └─ font-awesome.min.css
	│  │  │  ├─ fonts
	│  │  │  │  ├─ FontAwesome.otf
	│  │  │  │  ├─ fontawesome-webfont.eot
	│  │  │  │  ├─ fontawesome-webfont.svg
	│  │  │  │  ├─ fontawesome-webfont.ttf
	│  │  │  │  ├─ fontawesome-webfont.woff
	│  │  │  │  └─ fontawesome-webfont.woff2
	│  │  │  ├─ less
	│  │  │  │  ├─ animated.less
	│  │  │  │  ├─ bordered-pulled.less
	│  │  │  │  ├─ core.less
	│  │  │  │  ├─ fixed-width.less
	│  │  │  │  ├─ font-awesome.less
	│  │  │  │  ├─ icons.less
	│  │  │  │  ├─ larger.less
	│  │  │  │  ├─ list.less
	│  │  │  │  ├─ mixins.less
	│  │  │  │  ├─ path.less
	│  │  │  │  ├─ rotated-flipped.less
	│  │  │  │  ├─ screen-reader.less
	│  │  │  │  ├─ stacked.less
	│  │  │  │  └─ variables.less
	│  │  │  ├─ scss
	│  │  │  │  ├─ _animated.scss
	│  │  │  │  ├─ _bordered-pulled.scss
	│  │  │  │  ├─ _core.scss
	│  │  │  │  ├─ _fixed-width.scss
	│  │  │  │  ├─ _icons.scss
	│  │  │  │  ├─ _larger.scss
	│  │  │  │  ├─ _list.scss
	│  │  │  │  ├─ _mixins.scss
	│  │  │  │  ├─ _path.scss
	│  │  │  │  ├─ _rotated-flipped.scss
	│  │  │  │  ├─ _screen-reader.scss
	│  │  │  │  ├─ _stacked.scss
	│  │  │  │  ├─ _variables.scss
	│  │  │  │  └─ font-awesome.scss
	│  │  │  └─ HELP-US-OUT.txt
	│  │  ├─ jq
	│  │  │  ├─ jquery.form.js
	│  │  │  ├─ jquery.min.js
	│  │  │  └─ jquery.validate.min.js
	│  │  ├─ jqueryPagination /分页器
	│  │  │  ├─ css
	│  │  │  │  └─ jquery.pagination.css
	│  │  │  ├─ js
	│  │  │  │  └─ jquery.pagination.min.js
	│  │  │  └─ index.html
	│  │  └─ notice /弹窗插件
	│  │     ├─ css
	│  │     │  └─ jquery.notice.css
	│  │     ├─ image
	│  │     │  ├─ Thumbs.db
	│  │     │  ├─ notice_close.png
	│  │     │  └─ notice_warning.png
	│  │     └─ jquery.notice.js
	│  ├─ pages /页面
	│  │  ├─ cashRegister /收银记录
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ dataStatistics /数据统计
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ goodsDetailList /详细信息
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ goodsList /商品列表
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ goodsStorage /商品入库
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ home /首页（商品列表）
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ login /登录
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ messageList /消息通知
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  ├─ personList /人员管理
	│  │  │  ├─ index.html
	│  │  │  ├─ page.css
	│  │  │  └─ page.js
	│  │  └─ shoppingCart /购物车
	│  │     ├─ index.html
	│  │     ├─ page.css
	│  │     └─ page.js
	│  ├─ index.html 
	│  └─ utils.js /工具库
	└─ readme.md

## 任务分配
+ 登录界面
+ 商品列表
+ 商品操作
+ 收银记录
+ 消息通知
+ 数据统计
+ 人员管理
+ 待办事项