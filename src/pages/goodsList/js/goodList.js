import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () {
        return {
            searchValue: '',
            defaultTab: true,
            priceTab: true,
            salesTab: true,
            numberTab: true,
            // 分页
            currPage: 1,
        }
    },
    watch: {
        // 监听搜索栏输入
        searchValue: function (val) {
            this.$store.commit('searchGoods', val);
        }
    },
    computed: {
        allGoodsList: function () {
            if (this.$store.state.filterGoodsList.length === 0) {
                return this.$store.state.goods.goodsList;
            } else {
                return this.$store.state.filterGoodsList;
            }
        },
        pageFlag: function () {
            if (this.allGoodsList.length > 24) {
                return true;
            } else {
                return false;
            }
        },
        goodsList: function () {
            let goodsList = [];
            let i = (this.currPage - 1) * 24;
            while (i < this.currPage * 24) {
                if (this.allGoodsList[i]) {
                    goodsList.push(this.allGoodsList[i]);
                }
                i++;
            }
            return goodsList;
        },
        pageTotal: function () {
            return this.allGoodsList.length;
        }
    },
    methods: {
        // 快捷搜索
        quickSearch (event) {
            this.currPage = 1;
            this.$store.commit('categoryGoods', event.target.className);
        },
        // 切换Tab
        changeTab (name) {
            this.currPage = 1;
            this.$store.commit('sortGoods', name);
        },
        // 切换分页
        changePage (num) {
            this.currPage = num;
        },
        // 转去购物车
        goShoppingCart () {
            this.$router.push({
                path: '/shoppingCart'
            });
        },
        // 添加商品进购物车
        addShoppingCart (goods) {
            let shoppingCartList = this.$store.state.shoppingCart.shoppingCartList;
            for (let i = 0, len = shoppingCartList.length; i < len; i++) {
                if (shoppingCartList[i].coding === goods.coding) {
                    return this.$Message.error('商品已加入购物车中');
                }
            }
            if (goods.number > 0) {
                this.$store.commit('addShoppingCart', goods);
                this.$Message.success('商品加入购物车');
                let _this = this;
                let vshopDB = null;
                IndexedDB.openDB('vshopDB', 1, vshopDB, {
                    name: 'vshop',
                    key: 'name'
                }, function (db) {
                    let vshopDB = db;
                    IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.shoppingCart]);
                });
            } else {
                this.$Message.error('商品已售罄');
            }
        }
    }
}