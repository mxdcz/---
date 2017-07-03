/**
 * Created by Lim on 2017/7/3.
 */

// 每块可移动的位置
const move_dir = new Array();
move_dir[0] = [0];
move_dir[1] = [2, 4];
move_dir[2] = [1, 3, 5];
move_dir[3] = [2, 6];
move_dir[4] = [1, 5, 7];
move_dir[5] = [2, 4, 6, 8];
move_dir[6] = [3, 5, 9];
move_dir[7] = [4, 8];
move_dir[8] = [5, 7, 9];
move_dir[9] = [6, 8];

// 每块的位置x,y
const block_posXY = new Array();
block_posXY[0] = [0];
block_posXY[1] = [0, 0];
block_posXY[2] = [150, 0];
block_posXY[3] = [300, 0];
block_posXY[4] = [0, 150];
block_posXY[5] = [150, 150];
block_posXY[6] = [300, 150];
block_posXY[7] = [0, 300];
block_posXY[8] = [150, 300];
block_posXY[9] = [300, 300];

// 存当前点击块的位置
let block = new Array();
block[0] = 0;
block[1] = 1;
block[2] = 2;
block[3] = 3;
block[4] = 4;
block[5] = 5;
block[6] = 6;
block[7] = 7;
block[8] = 8;
block[9] = 0;

let pause = true;
let set_timer = null;
let time = 0;

function move(ele) {
    "use strict";

    let id = parseInt(ele.dataset.id);
    // 如何知道我点击的位置?
    // 循环每一块得到当前点击的块的位置i
    let i = 1;
    for (i; i < 10; i++) {
        if (block[i] === id) {
            break;
        }
    }
    // 当前块是否可移动
    let target = ToWhere(i);
    if (target) {
        block[i] = 0;
        block[target] = id;
        ele.style.left = `${block_posXY[target][0]}px`;
        ele.style.top = `${block_posXY[target][1]}px`;
    }

    var finish_flag = true;
    for (let i = 1; i < 9; ++i) {
        if (block[i] != i) {
            finish_flag = false;
            break;
        }
    }

    if (finish_flag === true) {
        if (!pause)
            start();
        alert("congratulation");
    }

}
function ToWhere(cur_pos) {
    // 循环当前块的可移动位置
    // 如果和block数组相等为0 则可移动
    for (let i = 0; i < move_dir[cur_pos].length; i++) {
        let b = move_dir[cur_pos][i];
        if (block[b] === 0) {
            return b;
        }
    }
    return 0;
}

function random() {
    "use strict";
    let box = document.querySelector('.box');
    //let nodeList = Array.from(box.children);
    //let newNodeList = [];
    let styleList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let newStyleList = [];

    // style
    while (styleList.length > 0) {
        let r = ~~(Math.random() * styleList.length);
        let index = styleList.splice(r, 1)[0];
        newStyleList.push(index);
    }

    for (let i = 0; i < 9; i++) {
        let pos = newStyleList[i];
        if (i >= 0 && i < 8) {
            let x = block_posXY[pos][0];
            let y = block_posXY[pos][1];
            box.children[i].style.left = `${x}px`;
            box.children[i].style.top = `${y}px`;
            block[pos] = parseInt(box.children[i].dataset.id);
        } else {
            block[pos] = 0;
        }

    }
}

//定时函数，每一秒执行一次
function timer() {
    time += 1;
    var min = parseInt(time / 60);//把秒转换为分钟，一分钟60秒，取商就是分钟
    var sec = time % 60;//取余就是秒
    document.getElementById("timer").innerHTML = min + "分" + sec + "秒";//然后把时间更新显示出来
}

//开始暂停函数
function start() {
    if (pause) {
        document.getElementById("start").innerHTML = "暂停";
        pause = false;
        set_timer = setInterval(timer, 1000);

    } else {
        document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(set_timer);
    }
}

function reset() {
    "use strict";
    time = 0;
    random();
    if (pause) {
        start();
    }
}
window.onload = function () {
    reset();
};