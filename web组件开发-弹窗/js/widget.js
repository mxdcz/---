/**
 * Created by Lim on 2017/6/5.
 */
define(['jquery'], function ($) {
    function Widget() {
        this.boundingBox = null;
    }

    Widget.prototype = {
        /*观察者模式*/
        /*
         * 这是一种创建松散耦合代码的技术。
         * 它定义对象间 一种一对多的依赖关系，
         * 当一个对象的状态发生改变时，
         * 所有依赖于它的对象都将得到通知。
         * 由主体和观察者组成，主体负责发布事件，
         * 同时观察者通过订阅这些事件来观察该主体。
         * 主体并不知道观察者的任何事情，
         * 观察者知道主体并能注册事件的回调函数。
         * */
        on: function (type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
        },
        fire: function (type, data) {

            if (this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
        },
        render: function (container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        destroy: function () {
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();

        },
        renderUI: function () {

        },
        bindUI: function () {

        },
        syncUI: function () {

        },
        destructor: function () {
        }
    };

    return {Widget: Widget}
});