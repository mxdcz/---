Demo:https://mxdcz.github.io/projects-study/%E6%95%B0%E5%AD%97%E6%8B%BC%E5%9B%BE%E6%B8%B8%E6%88%8F/index.html
### 实现思路:
- 首先确定每个块能够移动的位置(比如:第一块只能移动到第二块和第四块)
```
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
```

- 然后判断当前的可移动位置中是否有空块
```
// 存当前点击块的位置
let block = new Array();
block[0] = 0; //没用,占个位置
block[1] = 1;
block[2] = 2;
block[3] = 3;
block[4] = 4;
block[5] = 5;
block[6] = 6;
block[7] = 7;
block[8] = 8;
block[9] = 0;
```


```
// 循环当前块的可移动位置
// 如果和block数组相等为0 则可移动
for (let i = 0; i < move_dir[cur_pos].length; i++) {
    let b = move_dir[cur_pos][i];
    if (block[b] === 0) {
        return b;
    }
}
```

- 得到的空块的位置,并移动块
```
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
```
```
if (target) {
        block[i] = 0;
        block[target] = id;
        ele.style.left = `${block_posXY[target][0]}px`;
        ele.style.top = `${block_posXY[target][1]}px`;
    }
```

到这里就可以移动块了,接下来只要打乱块的位置就完成了
```
function random() {
    "use strict";
    let box = document.querySelector('.box');
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
```
