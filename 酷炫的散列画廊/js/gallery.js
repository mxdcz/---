/**
 * Created by Lim on 2017/6/8.
 */
(function () {
    var Gallery = function () {
        this.template = '<div class="photo" id="photo-{index}">' +
            '<div class="photo-wrap photo-front">' +
            '<div class="side side-front">' +
            '<p class="image"><img src="images/{img}" alt=""></p>' +
            '<p class="caption">{caption}</p>' +
            '</div>' +
            '<div class="side side-back">' +
            '<p class="desc">{desc}</p>' +
            '</div>' +
            '</div>' +
            '</div>';


    };
    Gallery.prototype = {
        initUI: function () {
            var html = '<div class="wrap" id="wrap"></div>';
            var t = [];
            for (var i = 0; i < data.length; i++) {
                var _html = this.template
                    .replace("{index}", i)
                    .replace("{img}", data[i]["img"])
                    .replace("{caption}", data[i]["caption"])
                    .replace("{desc}", data[i]["desc"]);
                t.push(_html);
            }
            $(document.body).html($(html).append(t.join('')));
            this.sortPhotos(this.random(0, data.length - 1));
        },
        renderUI: function () {
            this.initUI();


            this.bindUI();

        },
        bindUI: function () {
            var p = $(".photo");
            var that = this;
            p.on("click",function () {
                if ($(this).hasClass("photo-center")) {
                    that.turn(this);
                } else {
                    that.sortPhotos(this.id.split("-")[1]);
                }
            });
        },
        turn: function (el) {
            if ($(el).hasClass("photo-front")) {
                $(el).removeClass("photo-front");
                $(el).addClass("photo-back");
            } else {
                $(el).removeClass("photo-back");
                $(el).addClass("photo-front");
            }

        },
        random: function (n, m) {
            var diff;
            var min;
            if (n > m) {
                diff = n - m;
                min = m;
                Math.random()
            } else {
                diff = m - n;
                min = n;
            }
            return Math.ceil(Math.random() * diff + min);
        },
        range: function () {
            var range = {left: {x: [], y: []}, right: {x: [], y: []}};
            var wrap = {
                w: $('#wrap').width(),
                h: $('#wrap').height()
            };
            var photo = {
                w: $('.photo').width(),
                h: $('.photo').height()
            };

            range.wrap = wrap;
            range.photo = photo;
            range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];
            range.left.y = [0 - photo.h, wrap.h];
            range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w];
            range.right.y = [0 - photo.h, wrap.h];

            return range;

        },
        sortPhotos: function (n) {
            /*所有的海报都删除居中的class*/
            var _photos = $(".photo");
            for (var i in _photos) {
                $(_photos[i]).removeClass("photo-center");
                _photos[i].style = "";
            }
            /*给随机的一张海报添加居中的class*/
            var showCenter = $("#photo-" + n);
            showCenter.addClass("photo-center");


            /*没有居中的海报的数组*/
            var photos = [];
            for (var i = 0; i < _photos.length; i++) {
                if (_photos[i].id != "photo-" + n) {
                    photos.push(_photos[i]);
                }
            }

            /*将数组分成两部分*/
            var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
            var photos_right = photos;
            var ranges = this.range();
            for (var i in photos_left) {
                photos_left[i].style.left = this.random(ranges.left.x[0], ranges.left.x[1]) + 'px';
                photos_left[i].style.top = this.random(ranges.left.y[0], ranges.left.y[1]) + 'px';
                photos_left[i].style['-webkit-transform'] = "rotate(" + this.random(-150, 150) + "deg)";
            }
            for (var i in photos_right) {
                photos_right[i].style.left = this.random(ranges.right.x[0], ranges.right.x[1]) + 'px';
                photos_right[i].style.top = this.random(ranges.right.y[0], ranges.right.y[1]) + 'px';
                photos_right[i].style['-webkit-transform'] = "rotate(" + this.random(-150, 150) + "deg)";
            }
        }
    };

    window.Gallery = Gallery;
})();