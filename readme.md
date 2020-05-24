## One Shop
一个基于Jq + IndexedDB商店管理系统Web APP

## 测试账号
https://shuang13.github.io/one-shop/
用户名：Admin
密码：admin

## 目录结构

	├─ assets
	│  ├─ css
	│  │  ├─ button_item.css
	│  │  ├─ button_item_demo.html
	│  │  ├─ goods_tab.html
	│  │  ├─ input_item.css
	│  │  ├─ input_item_demo.html
	│  │  ├─ select_item_demo.html
	│  │  └─ tab.css
	│  ├─ Thumbs.db
	│  ├─ add.png
	│  ├─ logo-close.png
	│  ├─ logo.png
	│  └─ reset.css
	├─ components
	│  ├─ chart
	│  │  ├─ chart.css
	│  │  ├─ chart.js
	│  │  └─ demo.html
	│  ├─ popUp
	│  │  ├─ demo.html
	│  │  ├─ popUp.css
	│  │  └─ popUp.js
	│  └─ sortTable
	│     ├─ demo.html
	│     ├─ sortTable.css
	│     └─ sortTable.js
	├─ indexedDB
	│  ├─ indexedDB.js
	│  ├─ state.js
	│  └─ store.js
	├─ libs
	│  ├─ echart
	│  │  └─ echarts.min.js
	│  ├─ flatpickr
	│  │  ├─ themes
	│  │  │  ├─ airbnb.css
	│  │  │  ├─ base16_flat.css
	│  │  │  ├─ confetti.css
	│  │  │  ├─ dark.css
	│  │  │  ├─ material_blue.css
	│  │  │  ├─ material_green.css
	│  │  │  ├─ material_orange.css
	│  │  │  └─ material_red.css
	│  │  ├─ flatpickr.min.css
	│  │  ├─ flatpickr.min.js
	│  │  └─ zh.js
	│  ├─ font-awesome
	│  │  ├─ css
	│  │  │  ├─ font-awesome.css
	│  │  │  └─ font-awesome.min.css
	│  │  └─ fonts
	│  │     ├─ FontAwesome.otf
	│  │     ├─ fontawesome-webfont.eot
	│  │     ├─ fontawesome-webfont.svg
	│  │     ├─ fontawesome-webfont.ttf
	│  │     ├─ fontawesome-webfont.woff
	│  │     └─ fontawesome-webfont.woff2
	│  └─ jq
	│     ├─ jquery.form.js
	│     ├─ jquery.min.js
	│     └─ jquery.validate.min.js
	├─ pages
	│  ├─ cashRegister
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ dataStatistics
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ goodsDetail
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ goodsDetailList
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ goodsList
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ goodsStorage
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ home
	│  │  ├─ home.css
	│  │  ├─ home.js
	│  │  └─ index.html
	│  ├─ login
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ messageList
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  ├─ personList
	│  │  ├─ index.html
	│  │  ├─ page.css
	│  │  └─ page.js
	│  └─ shoppingCart
	│     ├─ index.html
	│     ├─ page.css
	│     └─ page.js
	├─ index.html
	├─ readme.md
	└─ utils.js


## 功能
+ 登录界面
	+ 保存登录状态
+ 商品列表
	+ 显示全部商品
	+ 加入购物车
+ 商品操作
	+ 商品入库
	+ 商品详细信息
		+ 修改商品
		+ 删除商品
+ 收银记录
+ 消息通知
	+ 库存提醒
	+ 保质期提醒
+ 购物车
	+ 删除订单商品
	+ 订单结账
+ 数据统计
	+ 年销售额
+ 人员管理
	+ 新添人员
	+ 删除人员
