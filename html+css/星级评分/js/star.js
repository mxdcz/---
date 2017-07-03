/**
 * Created by Lim on 2017/6/14.
 */
(function ($) {
    var Star = function () {
        this.FULL_STAR = false;
        this.ul = $('.ul');
        this.items = $('.li');
        this.num = 0;

    };
    Star.prototype = {
        init: function (options) {
            this.ul = $(options.prt);
            this.items = $(options.cld);
            //this.bind();
            //this.lightOn();
            this.lightHalf();
        },
        _lightOn: function (num) {
            //var that = this;
            this.items.each(function (index) {
                if (num > index) {
                    $(this).addClass("selected");
                } else {
                    if ($(this).hasClass("hovered")) {
                        $(this).removeClass("hovered");
                    }
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass("selected");
                    }
                }
            });
        },
        lightOn: function () {
            var that = this;
            this.ul.on('mouseover', '.li', function () {
                that._lightOn($(this).index() + 1);
            }).on('click', '.li', function () {
                that.num = $(this).index() + 1;
            }).on('mouseout', function () {
                that._lightOn(that.num);
            })
        },
        _lightHalf: function (num) {
            var that = this;
            this.items.each(function (index) {
                var count = parseInt(num);
                var isHalf = !(count === index);
                if (count > index) {
                    $(this).addClass("selected");
                } else {
                    if ($(this).hasClass("hovered")) {
                        $(this).removeClass("hovered");
                    }
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass("selected");
                    }
                }
                if (isHalf) {
                    that.items.eq(count).addClass("hovered");
                }
            });
        },
        lightHalf: function () {
            var that = this;
            this.ul.on('mousemove', '.li', function (e) {
                if (e.pageX - $(this).offset().left < $(this).width() / 2) {
                    that.num = $(this).index() + 0.5;
                    that._lightHalf(that.num);
                } else {
                    that.num = $(this).index() + 1;
                    that._lightOn(that.num);
                }
            }).on('click', '.li', function () {
                if (e.pageX - $(this).offset().left < $(this).width() / 2) {
                    that.num = $(this).index() + 0.5;
                } else {
                    that.num = $(this).index() + 1;
                }
                that.num = $(this).index() + 1;
            }).on('mouseout', function () {
                that._lightHalf(that.num);
            })
        }
    };

    window.Star = Star;
})(jQuery);