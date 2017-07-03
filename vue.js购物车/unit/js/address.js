/**
 * Created by Lim on 2017/6/13.
 */
new Vue({
    el: ".container",
    data: {
        addressList: [],
        defaultLen: 3,
        curIndex:0,
        shippingIndex:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: {
        filteredItems: function () {
            return this.addressList.slice(0, this.defaultLen);
        }
    },
    methods: {
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if (res.status == '0') {
                    _this.addressList = res.result;
                }

            });
        },
        setDefaultAddress: function (index) {
            this.addressList.forEach(function (item,i) {
                if(index==i) {
                    item.isDefault=true;
                }else{
                    item.isDefault=false;
                }
            });
        }
    }
});