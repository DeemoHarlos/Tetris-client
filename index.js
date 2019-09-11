/* PIXI ALIAS */
const App           = PIXI.Application
const loader        = PIXI.loader
const resource      = PIXI.loader.resources
const Sprite        = PIXI.Sprite
const Container     = PIXI.Container
const TextureCache  = PIXI.utils.TextureCache
const Graphics      = PIXI.Graphics
const Ticker        = PIXI.Ticker
const filters       = PIXI.filters

const minoTypes = [
	{
		'type'  : 'I',
		'color' : 0x00FFFF,
		'shape' : [[-1, 0],[ 0, 0],[ 1, 0],[ 2, 0]],
		'center': [0.5,-0.5],
		'kick'  : [
			[[[-2, 0],[ 1, 0],[-2,-1],[ 1, 2]],[[-1, 0],[ 2, 0],[-1, 2],[ 2,-1]]],
			[[[-1, 0],[ 2, 0],[-1, 2],[ 2,-1]],[[ 2, 0],[-1, 0],[ 2, 1],[-1,-2]]],
			[[[ 2, 0],[-1, 0],[ 2, 1],[-1,-2]],[[ 1, 0],[-2, 0],[ 1,-2],[-2, 1]]],
			[[[ 1, 0],[-2, 0],[ 1,-2],[-2, 1]],[[-2, 0],[ 1, 0],[-2,-1],[ 1, 2]]]
		]
	},{
		'type'  : 'O',
		'color' : 0xFFFF00,
		'shape' : [[ 0, 1],[ 1, 1],[ 0, 0],[ 1, 0]],
		'center': [0.5,0.5],
		'kick'  : [[[],[]],[[],[]],[[],[]],[[],[]]]
	},{
		'type'  : 'T',
		'color' : 0xFF00FF,
		'shape' : [[ 0, 1],[-1, 0],[ 0, 0],[ 1, 0]],
		'center': [0,0],
		'kick'  : [
			[[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]],[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]]],
			[[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]],[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]]],
			[[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]],[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]]],
			[[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]],[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]]]
		]
	},{
		'type'  : 'S',
		'color' : 0x00FF00,
		'shape' : [[ 1, 1],[ 0, 1],[ 0, 0],[-1, 0]],
		'center': [0,0],
		'kick'  : [
			[[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]],[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]]],
			[[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]],[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]]],
			[[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]],[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]]],
			[[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]],[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]]]
		]
	},{
		'type'  : 'Z',
		'color' : 0xFF0000,
		'shape' : [[-1, 1],[ 0, 1],[ 0, 0],[ 1, 0]],
		'center': [0,0],
		'kick'  : [
			[[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]],[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]]],
			[[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]],[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]]],
			[[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]],[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]]],
			[[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]],[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]]]
		]
	},{
		'type'  : 'J',
		'color' : 0x0000FF,
		'shape' : [[-1, 1],[-1, 0],[ 0, 0],[ 1, 0]],
		'center': [0,0],
		'kick'  : [
			[[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]],[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]]],
			[[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]],[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]]],
			[[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]],[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]]],
			[[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]],[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]]]
		]
	},{
		'type'  : 'L',
		'color' : 0xFF8800,
		'shape' : [[-1, 0],[ 0, 0],[ 1, 0],[ 1, 1]],
		'center': [0,0],
		'kick'  : [
			[[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]],[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]]],
			[[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]],[[ 1, 0],[ 1,-1],[ 0, 2],[ 1, 2]]],
			[[[ 1, 0],[ 1, 1],[ 0,-2],[ 1,-2]],[[-1, 0],[-1, 1],[ 0,-2],[-1,-2]]],
			[[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]],[[-1, 0],[-1,-1],[ 0, 2],[-1, 2]]]
		]
	}
]

var socket

var stateFunction   = idle
var action          = idle
var opTimeout1      = [300,300,300] // down, left, right
var opTimeout2      = [40,40,40] // down, left, right
var opTimer         = [0,0,0] // down, left, right
var frames          = 0
var app = new App({
	width           : 1280,
	height          : 960,
	antialias       : false,
	backgroundColor : 0x000000,
	transparent     : false,
	autoResize      : true,
	resolution      : 1,
})

var playfield
var operationQueue
var minoSeq
var nextMino
var curMino
var ghostMino
var shiftMino
var shifted
var updateFlag

var blocks
var grid

function idle() {
}

function rescale() {
	scaleToWindow(app.view)
}

function setup() {
	rescale()
	window.addEventListener('resize',rescale)
	$('#canvas').apnd(app.view)

	playfield = []
	for(var i=0;i<23;i++) {
		var arr = []
		for(var j=0;j<10;j++) {
			arr.push({
				'type': -1,
				'obj': null
			})
		}
		playfield.push(arr)
	}
	nextMino = []
	for (var i=0;i<5;i++) {
		nextMino.push({
			'type':-1,
			'pos' :[13,18-3*i],
			'rotate':0,
		})
	}
	curMino = {'type':-1}
	ghostMino = {'type':-1}
	shiftMino = {'type':-1}
	shifted = false
	updateFlag = false

	// grid
	grid = new Container()
	for(var i=0;i<21;i++) for(var j=0;j<10;j++) {
		var gridBlock = new Graphics()
		gridBlock.beginFill(((i+j)%2)?0x444444:0x333333)
		gridBlock.drawRect(2,2,36,36)
		gridBlock.x =  j * 40
		gridBlock.y = -i * 40 - 40
		grid.addChild(gridBlock)
	}
	grid.x = 640 -  5   * 40
	grid.y = 480 + 10.5 * 40
	app.stage.addChild(grid)

	blocks = new Container()
	blocks.x = 640 -  5   * 40
	blocks.y = 480 + 10.5 * 40
	app.stage.addChild(blocks)

	keySetup()

	// Create WebSocket connection.
	socket = new WebSocket('ws://127.0.0.1:2407')

	socket.onopen = function() {
		stateFunction = run
		app.ticker.add(gameLoop)
		socket.send(String.fromCharCode(0x01))
	}
}

function gameLoop(delta) {
	frames ++
	if(socket.readyState === 1) String.fromCharCode(0x00)
	stateFunction(app.ticker.elapsedMS)
}

function run(ms) {
	opTimer.forEach((e,i,a)=>a[i]-=ms)
	kd.tick()

	if (updateFlag) {
		updateFlag = false
		update()
	}

}

function update() {
	// curMino
	if (curMino.flag) {
		if(curMino.obj) curMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
		if(curMino.type!=-1) curMino.obj = drawNewMino(curMino)
	}
	if(curMino.type!=-1) setMinoPos(curMino)

	// ghostMino
	if (ghostMino.flag) {
		if(ghostMino.obj) ghostMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
		if(ghostMino.type!=-1) ghostMino.obj = drawGhostMino(ghostMino)
	}
	if(ghostMino.type!=-1) setMinoPos(ghostMino)

	// shiftMino
	if (shiftMino.flag) {
		if(shiftMino.obj) shiftMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
		if(shiftMino.type!=-1) shiftMino.obj = drawNewMino(shiftMino)
	}
	if(shiftMino.type!=-1) setGhostPos()

	// nextMino
	nextMino.forEach((e,i,a)=>{
		if (e.flag) {
			if(e.obj) shiftMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
			if(e.type!=-1) e.obj = drawNewMino(e)
		}
		if(e.type!=-1) setGhostPos()
	})

	//playfield
	playfield.forEach((y,yi,pf)=>{
		y.forEach((x,xi,y)=>{
			if (x.flag) {
				blocks.removeChild(x.obj)
				if (x.type!=-1) {
					var curMinoInfo = minoTypes[x.type]
					y[xi].obj = new Graphics()
					y[xi].obj.beginFill(curMinoInfo.color)
					y[xi].obj.drawRect(2,2,36,36)
					blocks.addChild(y[xi].obj)
				}
			}
		})
	})
}

function sendAction(act) {
	var code
	switch (act) {
		case 'start'     : code = 0x01;break
		case 'softDrop'  : code = 0x20;break
		case 'hardDrop'  : code = 0x21;break
		case 'moveLeft'  : code = 0x22;break
		case 'moveRight' : code = 0x23;break
		case 'rotateCw'  : code = 0x24;break
		case 'rotateCcw' : code = 0x25;break
		case 'hold'      : code = 0x31;break
		default          : code = 0x00
	}
	socket.send(String.fromCharCode(code))
}

function keyTimeout(key,to1,to2,i,f) {
	kd[key].press(()=>{
		opTimer[i] = to1
		sendAction(f)
	})
	kd[key].down(()=>{
		while (opTimer[i]<=0) {
			opTimer[i] += to2
			sendAction(f)
		}
	})
}

function keySetup() {
	kd.UP   .press(()=>{sendAction('rotateCw')})
	kd.W    .press(()=>{sendAction('rotateCw')})
	kd.Z    .press(()=>{sendAction('rotateCcw')})
	kd.SPACE.press(()=>{sendAction('hardDrop')})
	kd.SHIFT.press(()=>{sendAction('hold')})
	kd.C    .press(()=>{sendAction('hold')})

	keyTimeout('S'    ,opTimeout1[0],opTimeout2[0],0,'softDrop')
	keyTimeout('DOWN' ,opTimeout1[0],opTimeout2[0],0,'softDrop')
	keyTimeout('A'    ,opTimeout1[1],opTimeout2[1],1,'moveLeft')
	keyTimeout('LEFT' ,opTimeout1[1],opTimeout2[1],1,'moveLeft')
	keyTimeout('D'    ,opTimeout1[2],opTimeout2[2],2,'moveRight')
	keyTimeout('RIGHT',opTimeout1[2],opTimeout2[2],2,'moveRight')
}



function addNextMino() {
	var i = nextMino.length
	nextMino.push({
		'type':minoSeq[0],
		'pos' :[13,18-3*i],
		'rotate':0,
	})
	nextMino[i].obj = drawNewMino(nextMino[i])
	setMinoPos(nextMino[i])
	minoSeq.splice(0,1)
}

function newMino() {
	curMino = nextMino[0]
	curMino.pos = [4,19]
	curMino.rotate = 0
	if (collision(curMino)) curMino.pos = [4,20]
	setMinoPos(curMino)

	nextMino.splice(0,1)
	nextMino.forEach((e,i,a)=>{
		e.pos=[13,18-3*i]
		setMinoPos(e)
	})
	addNextMino()
	if (minoSeq.length<=0) minoSeq = shuffle([0,1,2,3,4,5,6])

	if (collision(curMino)) lose()
	else newGhostMino()
}

function drawNewMino(cur) {
	var curMinoInfo = minoTypes[cur.type]
	var obj = []
	curMinoInfo.shape.forEach((e,i,a)=>{
		var block = new Graphics()
		block.beginFill(curMinoInfo.color)
		block.drawRect(2,2,36,36)
		blocks.addChild(block)
		obj.push(block)
	})
	return obj
}

function setMinoPos(cur) {
	var curMinoInfo = minoTypes[cur.type]
	cur.obj.forEach((e,i,a)=>{
		var blockPos = getBlockPos(curMinoInfo.shape[i],cur.pos,curMinoInfo.center,cur.rotate)
		e.x =  blockPos[0] * 40
		e.y = -blockPos[1] * 40 - 40
	})
}

function rotateMatrix(r) {
	if (r == 0)
		return [[1,0],[0,1]]
	else if (r == 1)
		return [[0,1],[-1,0]]
	else if (r == 2)
		return [[-1,0],[0,-1]]
	else if (r == 3)
		return [[0,-1],[1,0]]
}

function getBlockPos(shift,pos,center,rotate) {
	var m = rotateMatrix(rotate)
	var newShift = [(shift[0]-center[0])*m[0][0]+(shift[1]-center[1])*m[0][1],
	                (shift[0]-center[0])*m[1][0]+(shift[1]-center[1])*m[1][1]]
	return [newShift[0]+pos[0]+center[0],newShift[1]+pos[1]+center[1]]
}


// GhostMino
function newGhostMino() {
	ghostMino.type = curMino.type
	ghostMino.pos = [curMino.pos[0],curMino.pos[1]]
	ghostMino.rotate = curMino.rotate
	if(ghostMino.obj) ghostMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
	ghostMino.obj = drawGhostMino(curMino)
	setGhostPos()
}

function drawGhostMino(cur) {
	var curMinoInfo = minoTypes[cur.type]
	var obj = []
	curMinoInfo.shape.forEach((e,i,a)=>{
		var block = new Graphics()
		block.lineStyle(3,curMinoInfo.color)
		block.drawRect(3,3,33,33)
		blocks.addChild(block)
		obj.push(block)
	})
	return obj
}

function setGhostPos() {
	ghostMino.pos = [curMino.pos[0],curMino.pos[1]]
	ghostMino.rotate = curMino.rotate
	var t = ghostMino.pos[1]
	while (!collision(ghostMino)) {
		t = ghostMino.pos[1]
		ghostMino.pos[1] --
	}
	ghostMino.pos[1] = t
	setMinoPos(ghostMino)
}

setup()


// Connection opened
socket.addEventListener('open', function (event) {

})

// Listen for messages
socket.addEventListener('message', function (event) {
	var buf = new Uint8Array(event.data)

	var index = 0
	var code = buf[index++]
	var data = []
	data.push(buf[index++])
	data.push(buf[index++])
	data.push(buf[index++])
	data.push(buf[index++])

	var curType = buf[index++]
	if (curMino.type !== curType) {
		curMino.flag = true
		curMino.type = curType
	}
	curMino.pos[0] = buf[index++]
	curMino.pos[1] = buf[index++]
	curMino.rotate = buf[index++]

	var shiftType = buf[index++]
	if (shiftMino.type !== shiftType) {
		shiftMino.flag = true
		shiftMino.type = shiftType
	}

	var ghostType = buf[index++]
	if (ghostMino.type !== ghostType) {
		ghostMino.flag = true
		ghostMino.type = ghostType
	}
	ghostMino.pos[0] = buf[index++]
	ghostMino.pos[1] = buf[index++]
	ghostMino.rotate = buf[index++]

	playfield.forEach((y,yi,pf)=>{
		y.forEach((x,xi,y)=>{
			var type = buf[index++]
			if (y[xi].type !== type) {
				y[xi].flag = true
				y[xi].type = type
			}
		})
	})

	var nl = buf.readInt8(nl,index++)
	for (var i=0;i<nextMino.length;i++){
		var type = (i<nl)?buf[index++]:-1
		if (nextMino[i].type !== type) {
			nextMino[i].flag = true
			nextMino[i].type = type
		}
	}
/*
	switch (code) {
		case 0x01 : start()     ;break
	//	case 0x02 : pause()     ;break
		case 0x08 : lose()      ;break
		case 0x10 : fall()      ;break
		case 0x20 : softDrop()  ;break
		case 0x21 : hardDrop()  ;break
		case 0x22 : moveLeft()  ;break
		case 0x23 : moveRight() ;break
		case 0x24 : rotateCw()  ;break
		case 0x25 : rotateCcw() ;break
		case 0x30 : newMino()   ;break
		case 0x31 : hold()      ;break
		case 0x32 : lock()      ;break
		case 0x00 : idle()      ;break
		default   : idle()
	}
*/
	updateFlag = true
})
