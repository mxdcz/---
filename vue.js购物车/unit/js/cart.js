/**
 * Created by Lim on 2017/6/13.
 */
var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        thisProduct:{}
    },
    filters: {
        formatMoney: function (value, type) {

            return "$" + value.toFixed(2) + type;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });

    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get("data/cartData.json", {"id": 123}).then(function (res) {
                //_this.totalMoney = res.data.result.totalMoney;
                _this.productList = res.data.result.list;
            });
        },
        changeNumber: function (item, way) {

            if (way > 0) {
                item.productQuantity++;

            } else {
                item.productQuantity--;
                if (item.productQuantity < 1) {
                    item.productQuantity = 1;
                }
            }
            this.calcTotalMoney();
        },
        selectProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                //Vue.set(item, "checked", true);
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
                if (!item.checked) {
                    this.checkAllFlag = false;
                }
            }
            this.calcTotalMoney();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item) {
                if (typeof item.checked == 'undefined') {
                    //Vue.set(item, "checked", true);
                    _this.$set(item, "checked", _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalMoney();
        },
        calcTotalMoney: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.thisProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.thisProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
});
Vue.filter("money", function (value) {
    return "$" + value.toFixed(2);
});