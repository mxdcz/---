/**
 * Created by Lim on 2017/6/30.
 */
'use strict';
const _init = {
    speed: 2,
    top: -100,
    score: 0,
    countStep: 1,
    timer: null,
};
class BlockGame {
    constructor() {
        this.init();
    }

    init() {
        Object.assign(this, _init);
        let ctrl = document.querySelector('.ctrl'),
            main = document.querySelector('.main'),
            score = document.querySelector('.score');
        this.ctrlDom = ctrl;
        this.mainDom = main;
        this.initDom(this.ctrlDom);
        this.observer('score', val=>score.textContent = `分数:${val}`);
        this.bindEvent(this.ctrlDom);
    }

    start(){
        let mask = document.querySelector('.mask');
        mask.classList.add('hide');
        requestAnimationFrame(this.move.bind(this));
    }

    initDom(node) {
        for (let i = 0; i < 4; i++) {
            let row = this.createRow();
            let random = this.getRandom();
            for (let j = 0; j < 4; j++) {
                let col = this.createCol();
                if (random === j) col.classList.add('black');
                row.appendChild(col);
            }
            node.appendChild(row);
            node.style.top = `${this.top}px`;
        }
    }

    clearDom(node) {
        if (node.childNodes.length) {
            let len = node.childNodes.length - 1;
            for (let i = len; i >= 0; i--) {
                node.removeChild(node.childNodes.item(i));
            }
        }
    }

    /**
     * 向下移动块
     */
    move() {
        this.top += this.speed;
        if (this.top === 0) {
            this.gameOver();
            return;
        }
        this.ctrlDom.style.top = `${this.top}px`;
        this.timer = requestAnimationFrame(this.move.bind(this));
    }

    gameOver() {
        cancelAnimationFrame(this.timer);
        let mask = document.querySelector('.mask');
        mask.classList.remove('hide');
        this.clearDom(this.ctrlDom);
        //alert('game is over!');
        this.init();
    }

    /**
     * 监听数据变化,getset是闭包,里面的调用val 所以val常驻内存
     * @param key
     * @param callback
     */
    observer(key, callback) {
        let val = this[key];
        Object.defineProperty(this, key, {
            get: ()=> {
                return val;
            },
            set: (newVal)=> {
                callback(newVal);
                val = newVal;
            },
            enumerable: true,
            configurable: true,
        })
    }

    /**
     * 绑定页面的点击事件,判断是否点击白块,
     * 并做做相关处理
     */
    bindEvent(node) {
        this.mainDom.addEventListener('click', (e)=> {
            let target = e.target;
            if (target.className.indexOf('black') > -1) {
                this.deleteRow(target);
                this.top -= 100;
                this.score += this.countStep;
                this.createRowOnFirst(node);
            } else {
                this.gameOver();
            }
        }, false);
    }

    /**
     * 生成一行四列的块,插入node的第一个节点
     * @param node 所有块的父元素
     */
    createRowOnFirst(node) {
        let row = this.createRow();
        let random = this.getRandom();
        for (let j = 0; j < 4; j++) {
            let col = this.createCol();
            if (random === j) col.classList.add('black');
            row.appendChild(col);
        }

        node.insertBefore(row, node.firstChild);
    }

    createRow() {
        let row = document.createElement('div');
        row.className = 'row';
        return row;
    }

    createCol() {
        let col = document.createElement('div');
        col.className = 'col';
        return col;
    }

    deleteRow(node) {
        let parent = node.parentNode;
        parent.parentNode.removeChild(parent);
    }

    getRandom() {
        return ~~(Math.random() * 4);
    }


}
export default BlockGame;