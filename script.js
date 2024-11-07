// Commands: move();	turn();		takesun();		putsun(); 
for (let i = 0; i < 100; i++) {
	$(`#board`).append(`<div class="cell" id="cell-${i}">${i}</div>`);
}

let levels = [
	{
		obstacles: [82, 84, 92, 94, 63],
		robiPosition: 93,
		robiDir: 0, // 0: left, 1: top, 2: right, 3:bottom
		sun: [74],
		dark: [65]
	},
];	

let dirs = [`left`, `top`, `right`, `bottom`];
let level = 0;
let robiPosition = levels[level].robiPosition;
let robiDir = levels[level].robiDir;
let cellWidth = $(`#cell-0`).width();
prepareBoard(level);

function prepareBoard(level) {
	addClassFunction(levels[level].obstacles, `obstacles`);
	addClassFunction(levels[level].sun, `sun`);
	addClassFunction(levels[level].dark, `dark`);
	moveRobi(robiPosition);
	rotateRobi(robiDir);
}	

function addClassFunction(arrays, cl) {
	for (let a of arrays) {
		$(`#cell-${a}`).addClass(cl);
	}
}

function rotateRobi(dir) {
	$(`#robi`).addClass(dirs[dir]);
}

$(`#run`).click(function() {
	let commands = $(`#command`).val();
	commands = commands.split("\n");
	commands.forEach(function(cmd) {
		run(cmd);
	});
});

function run(command) {
	switch(command)
	{
		case 'move();':
			switch(robiDir)
			{
				case 0:
					$(`#robi`).animate({left: '-=' + cellWidth + "px"});
					break;
				case 1:
					$(`#robi`).animate({top: '-=' + cellWidth + "px"});
					break;
				case 2:
					$(`#robi`).animate({left: '+=' + cellWidth + "px"});
					break;
				case 3:
					$(`#robi`).animate({left: '+=' + cellWidth + "px"});
					break;	
			}
			break;
		case 'turn();':
			robiDir++;
			if (robiDir > 3) {
				robiDir -= 3
			}
			$(`#robi`).css({transform: `rotate(${90 * robiDir})`});
			break;
	}
}

function moveRobi(cellId) {
	let pos = $(`#cell-${cellId}`).position();
	$(`#robi`).css({ 
		'width': $(`#cell-${cellId}`).width(),  
		'height': $(`#cell-${cellId}`).height(), 
		'top': pos.top,
		'left': pos.left
	});
}