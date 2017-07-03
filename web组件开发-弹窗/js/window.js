/**
 * Created by Lim on 2017/6/5.
 */
define(['widget', 'jquery', 'jqueryUI'], function (widget, $, $UI) {
    function Window() {
        this.cfg = {
            content: '你没有设置提示信息.',
            width: 500,
            height: 300,
            skinClassName: 'window_skin_default',
            title: '系统消息',
            hasCloseBtn: false,
            handler4ConfirmBtn: null,
            handler4CloseBtn: null,
            text4ConfirmBtn: '确定',
            hasMask: true,
            isDraggable: true
        }
    }

    Window.prototype = $.extend({}, new widget.Widget(), {

        renderUI: function () {
            this.boundingBox = $('<div class="window_boundingBox">' +
                '<div class="window_header">' + this.cfg.title + '</div>' +
                '<div class="window_body">' + this.cfg.content + '</div>' +
                '<div class="window_footer">' +
                '<input type="button" class="window_confirmBtn" value="' + this.cfg.text4ConfirmBtn + '">' +
                '</div>' +
                '</div>');
            if (this.cfg.hasMask) {
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }
            if (this.cfg.hasCloseBtn) {
                this.boundingBox.append('<span class="window_closeBtn">×</span>');
            }
            //this.boundingBox.appendTo('body');
            this.boundingBox.appendTo(document.body);

        },
        bindUI: function () {
            var that = this;
            this.boundingBox.delegate('.window_confirmBtn', 'click', function () {
                that.fire("alert");
                that.destroy();
            });
            this.boundingBox.delegate('.window_closeBtn', 'click', function () {
                that.fire("alert");
                that.destroy();
            });
            if (this.cfg.handler4CloseBtn) {
                this.on('close', this.cfg.handler4CloseBtn);
            }
            if (this.cfg.handler4ConfirmBtn) {
                this.on('alert', this.cfg.handler4ConfirmBtn);
            }
        },
        syncUI: function () {
            /*定制弹窗的位置*/
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
            });

            /*定制皮肤*/
            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            } else {
                boundingBox.addClass('window_skin_default');
            }
            /*定制拖动*/
            if (this.cfg.isDraggable) {
                this.boundingBox.draggable({handle: ".window_header"});
            }

        },
        destructor: function () {
            this._mask && this._mask.remove();
        },
        alert: function (cfg) {
            $.extend(this.cfg, cfg);
            this.render();
            return this;
        },
        confirm: function () {
        },
        prompt: function () {
        }









        //alert: function (cfg) {
        //    var CFG = $.extend(this.cfg, cfg);
        //
        //    /*在添加弹窗前,是否要遮罩层*/
        //    var that = this;
        //    var mask = null;
        //    if (CFG.hasMask) {
        //        mask = $('<div class="window_mask"></div>');
        //        mask.appendTo('body');
        //    }
        //
        //    /*添加弹窗box*/
        //    var boundingBox = $('<div class="window_boundingBox">' +
        //        '<div class="window_header">' + CFG.title + '</div>' +
        //        '<div class="window_body">' + CFG.content + '</div>' +
        //        '<div class="window_footer"><input type="button" class="window_confirmBtn" value="' + CFG.text4ConfirmBtn + '"></div>' +
        //        '</div>');
        //    boundingBox.css({
        //        width: CFG.width + 'px',
        //        height: CFG.height + 'px',
        //        left: (CFG.x || (window.innerWidth - CFG.width) / 2) + 'px',
        //        top: (CFG.y || (window.innerHeight - CFG.height) / 2) + 'px'
        //    });
        //    boundingBox.appendTo('body');
        //
        //
        //
        //
        //    /*在弹窗里定制确认按钮*/
        //    var btn = boundingBox.find('.window_confirmBtn');
        //    btn.click(function () {
        //        that.fire("alert");
        //        //CFG.handler4ConfirmBtn && CFG.handler4ConfirmBtn();
        //        boundingBox.remove();
        //        mask && mask.remove();
        //    });
        //
        //    /*在弹窗里定制关闭按钮*/
        //    if (CFG.hasCloseBtn) {
        //        var closeBtn = $('<span class="window_closeBtn">×</span>');
        //        closeBtn.appendTo(boundingBox);
        //        closeBtn.click(function () {
        //            that.fire("close");
        //            //CFG.handler4CloseBtn && CFG.handler4CloseBtn();
        //            boundingBox.remove();
        //            mask && mask.remove();
        //        })
        //
        //    }
        //
        //    if (CFG.handler4CloseBtn) {
        //        this.on('close', CFG.handler4CloseBtn);
        //    }
        //    if (CFG.handler4ConfirmBtn) {
        //        this.on('alert', CFG.handler4ConfirmBtn);
        //    }
        //
        //    /*定制皮肤*/
        //    if (CFG.skinClassName) {
        //        boundingBox.addClass(CFG.skinClassName);
        //
        //    } else {
        //        boundingBox.addClass('window_skin_default');
        //    }
        //
        //    /*定制拖动*/
        //    if (CFG.isDraggable) {
        //        boundingBox.draggable({handle: ".window_header"});
        //    }
        //
        //
        //},
        //confirm: function () {
        //},
        //prompt: function () {
        //}

    });
    return {Window: Window}
});