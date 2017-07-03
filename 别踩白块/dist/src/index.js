(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    /**
     * Created by Lim on 2017/6/30.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _init = {
        speed: 2,
        top: -100,
        score: 0,
        countStep: 1,
        timer: null
    };

    var BlockGame = function () {
        function BlockGame() {
            _classCallCheck(this, BlockGame);

            this.init();
        }

        _createClass(BlockGame, [{
            key: 'init',
            value: function init() {
                Object.assign(this, _init);
                var ctrl = document.querySelector('.ctrl'),
                    main = document.querySelector('.main'),
                    score = document.querySelector('.score');
                this.ctrlDom = ctrl;
                this.mainDom = main;
                this.initDom(this.ctrlDom);
                this.observer('score', function (val) {
                    return score.textContent = '\u5206\u6570:' + val;
                });
                this.bindEvent(this.ctrlDom);
            }
        }, {
            key: 'start',
            value: function start() {
                var mask = document.querySelector('.mask');
                mask.classList.add('hide');
                requestAnimationFrame(this.move.bind(this));
            }
        }, {
            key: 'initDom',
            value: function initDom(node) {
                for (var i = 0; i < 4; i++) {
                    var row = this.createRow();
                    var random = this.getRandom();
                    for (var j = 0; j < 4; j++) {
                        var col = this.createCol();
                        if (random === j) col.classList.add('black');
                        row.appendChild(col);
                    }
                    node.appendChild(row);
                    node.style.top = this.top + 'px';
                }
            }
        }, {
            key: 'clearDom',
            value: function clearDom(node) {
                if (node.childNodes.length) {
                    var len = node.childNodes.length - 1;
                    for (var i = len; i >= 0; i--) {
                        node.removeChild(node.childNodes.item(i));
                    }
                }
            }
        }, {
            key: 'move',
            value: function move() {
                this.top += this.speed;
                if (this.top === 0) {
                    this.gameOver();
                    return;
                }
                this.ctrlDom.style.top = this.top + 'px';
                this.timer = requestAnimationFrame(this.move.bind(this));
            }
        }, {
            key: 'gameOver',
            value: function gameOver() {
                cancelAnimationFrame(this.timer);
                var mask = document.querySelector('.mask');
                mask.classList.remove('hide');
                this.clearDom(this.ctrlDom);
                //alert('game is over!');
                this.init();
            }
        }, {
            key: 'observer',
            value: function observer(key, callback) {
                var val = this[key];
                Object.defineProperty(this, key, {
                    get: function get() {
                        return val;
                    },
                    set: function set(newVal) {
                        callback(newVal);
                        val = newVal;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }, {
            key: 'bindEvent',
            value: function bindEvent(node) {
                var _this = this;

                this.mainDom.addEventListener('click', function (e) {
                    var target = e.target;
                    if (target.className.indexOf('black') > -1) {
                        _this.deleteRow(target);
                        _this.top -= 100;
                        _this.score += _this.countStep;
                        _this.createRowOnFirst(node);
                    } else {
                        _this.gameOver();
                    }
                }, false);
            }
        }, {
            key: 'createRowOnFirst',
            value: function createRowOnFirst(node) {
                var row = this.createRow();
                var random = this.getRandom();
                for (var j = 0; j < 4; j++) {
                    var col = this.createCol();
                    if (random === j) col.classList.add('black');
                    row.appendChild(col);
                }

                node.insertBefore(row, node.firstChild);
            }
        }, {
            key: 'createRow',
            value: function createRow() {
                var row = document.createElement('div');
                row.className = 'row';
                return row;
            }
        }, {
            key: 'createCol',
            value: function createCol() {
                var col = document.createElement('div');
                col.className = 'col';
                return col;
            }
        }, {
            key: 'deleteRow',
            value: function deleteRow(node) {
                var parent = node.parentNode;
                parent.parentNode.removeChild(parent);
            }
        }, {
            key: 'getRandom',
            value: function getRandom() {
                return ~~(Math.random() * 4);
            }
        }]);

        return BlockGame;
    }();

    exports.default = BlockGame;
});