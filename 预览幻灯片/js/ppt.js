/**
 * Created by Lim on 2017/6/9.
 */
(function ($) {
    var Slider = function () {
        this._html = '<div class="slider">' +
            '<div class="main" id="main">' +
            '</div>' +
            '<div class="ctrl" id="ctrl">' +
            '</div>' +
            '</div>';

        this.templateMain = '<div class="main-i">' +
            '<img src="images/{index}.jpg">' +
            '<div class="caption">' +
            '<h2>{h2}</h2>' +
            '<h3>{h3}</h3>' +
            '</div>' +
            '</div>';

        this.templateCtrl = '<a class="ctrl-i" href="javascript:">' +
            '<img src="images/{index}.jpg">' +
            '</a>';

        this.init();
        this.bind();

    };
    Slider.prototype = {
        init: function () {
            var that = this;
            var mainArr = [],
                ctrlArr = [];
            $(data).each(function (i) {
                var mainItems = that.templateMain
                    .replace("{index}", ++i)
                    .replace("{h2}", this.h2)
                    .replace("{h3}", this.h3);
                var ctrlItems = that.templateCtrl
                    .replace("{index}", i);
                mainArr.push(mainItems);
                ctrlArr.push(ctrlItems);
            });

            $(document.body).html(this._html);
            $("#main").append(mainArr.join(""));
            $("#ctrl").append(ctrlArr.join(""));

            var mains = $('.main-i');
            var ctrls = $('.ctrl-i');
            mains.eq(0).addClass('main-i-active');
            ctrls.eq(0).addClass('ctrl-i-active');
        },
        bind: function () {
            var mains = $('.main-i');
            var ctrls = $('.ctrl-i');
            ctrls.each(function (i) {
                $(this).on('click', function () {
                    mains.each(function () {
                        $(this).removeClass('main-i-active');
                    });
                    ctrls.each(function () {
                        $(this).removeClass('ctrl-i-active');
                    });
                    mains.eq(i).addClass('main-i-active');
                    $(this).addClass('ctrl-i-active');
                })

            });
        }
    };


    window.Slider = Slider;
})(jQuery);