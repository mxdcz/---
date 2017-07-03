var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var me = true;
var myWin = [];
var computerWin = [];
var over = false;
// 赢法数组
var winList = [];
// 落子统计数组
var chessList = [];
for (var i = 0; i < 15; i++) {
	chessList[i] = [];
	winList[i] = [];

	for (var j = 0; j < 15; j++) {
		chessList[i][j] = 0;
		winList[i][j] = [];
	}
}

var count = 0;
// 所有横线的赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			winList[i][j + k][count] = true;
		}
		count++;
	}
}
// 所有竖线的赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			winList[j + k][i][count] = true;
		}
		count++;
	}
}
// 所有斜线的赢法
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			winList[i + k][j + k][count] = true;
		}
		count++;
	}
}
// 所有反斜线的赢法
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			winList[i + k][j - k][count] = true;
		}
		count++;
	}
}

for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}
// 画背景图
// context.drawImage(imgpath,0,0,450,450);

// 画棋盘
var drawChessBoard = function() {
	for (var i = 0; i < 15; i++) {
		// 描边颜色
		context.strokeStyle = '#bfbfbf'
			// 横线 x为已知15,435  求y
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
		// 竖线 y为已知15,435  求x
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke(); // 描边
	}
};
// 画棋子
var oneStep = function(x, y, me) {
	context.beginPath();
	context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);
	var gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, '#0a0a0a');
		gradient.addColorStop(1, '#637766');
	} else {
		gradient.addColorStop(0, '#d1d1d1');
		gradient.addColorStop(1, '#f9f9f9');
	}
	context.closePath();
	context.fillStyle = gradient;
	context.fill();
};
// 落子
chess.onclick = function(e) {
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	var ox = e.offsetX;
	var oy = e.offsetY;
	var x = Math.floor(ox / 30);
	var y = Math.floor(oy / 30);
	if (chessList[x][y] === 0) {
		oneStep(x, y, me);
		chessList[x][y] = 1;
		for (var i = 0; i < count; i++) {
			if (winList[x][y][i]) {
				myWin[i]++;
				computerWin[i] = 6;
				if (myWin[i] === 5) {
					window.alert('我赢了');
					over = true;
				}
			}
		}
		if (!over) {
			me = !me;
			computerAI();
		}
	}


};
var computerAI = function() {
	var max = 0;
	var u = 0,
		v = 0;
	// 初始化分数数组
	var myScore = [];
	var computerScore = [];
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	// 遍历棋盘
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			// 如果该位置是空的
			if (chessList[i][j] === 0) {
				// 遍历所有赢法
				for (var k = 0; k < count; k++) {
					if (winList[i][j][k]) {
						if (myWin[k] === 1) {
							myScore[i][j] += 200;
						} else if (myWin[k] === 2) {
							myScore[i][j] += 400;
						} else if (myWin[k] === 3) {
							myScore[i][j] += 2000;
						} else if (myWin[k] === 4) {
							myScore[i][j] += 10000;
						}

						if (computerWin[k] === 1) {
							computerScore[i][j] += 220;
						} else if (myWin[k] === 2) {
							computerScore[i][j] += 420;
						} else if (myWin[k] === 3) {
							computerScore[i][j] += 2100;
						} else if (myWin[k] === 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;


				} else if (myScore[i][j] == max) {
					if (computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;


				} else if (computerScore[i][j] == max) {
					if (myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u, v, false);
	chessList[u][v] = 2;
	for (var i = 0; i < count; i++) {
		if (winList[u][v][i]) {
			computerWin[i]++;
			myWin[i] = 6;
			if (computerWin[i] === 5) {
				window.alert('计算机赢了');
				over = true;
			}
		}
	}
	if (!over) {
		me = !me;
	}

}
drawChessBoard();