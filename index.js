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

function randomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

var state           = 'loading'
var stateFunction   = idle
var action          = idle
var actionTimer     = 0
var actionTimeout   = 1000
var frames          = 0
app = new App({
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
var nextMino
var curMino

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
	window.addEventListener('keydown',onKeyDown)
	$('#canvas').apnd(app.view)

	playfield = []
	operationQueue = []
	nextMino = [2,3,1,5,0]
	curMino = {}

	for(var i=0;i<23;i++) {
		var arr = []
		for(var j=0;j<10;j++) {
			arr.push({
				'type': -1,
				'object': null
			})
		}
		playfield.push(arr)
	}

	// DRAW!
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

	newMino()
	stateFunction = run
	action = fall
	app.ticker.add(gameLoop)
}

function gameLoop(delta) {
	frames ++
	actionTimer -= app.ticker.elapsedMS
	stateFunction()
}

function run() {
	if (operationQueue.length > 0) {
		operationQueue.forEach((e,i,a)=>{
			console.log(e.code)
			if (stateFunction === run) {
				switch (e.keyCode) {
					// W (87) & Up arrow (38)
					case 87: rotate(1);break
					case 38: rotate(1);break
					// S (83) & Down arrow (40)
					case 83: softDrop();break
					case 40: softDrop();break
					// A (65) & Left arrow (37)
					case 65: moveLeft();break
					case 37: moveLeft();break
					// D (68) & Right arrow (39)
					case 68: moveRight();break
					case 39: moveRight();break
					// Z (90)
					case 90: rotate(-1);break
					// space (32)
					case 32: hardDrop()
				}
			}
			setMinoPos(curMino)
		})
		operationQueue = []
	}


	if (actionTimer <= 0) {
		action()
		setMinoPos(curMino)
		actionTimer = actionTimeout
	}
}

function onKeyDown(key) {
	operationQueue.push(key)
}

function newMino() {
	curMino.type = nextMino[0]
	curMino.pos = [4,19]
	curMino.rotate = 0
	if (collision(curMino)) curMino.pos = [4,20]
	curMino.obj = drawNewMino(curMino)
	setMinoPos(curMino)

	nextMino.splice(0,1)
	nextMino.push(randomInt(minoTypes.length))

	if (collision(curMino)) lose()
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

function setMinoPos() {
	var curMinoInfo = minoTypes[curMino.type]
	curMino.obj.forEach((e,i,a)=>{
		var blockPos = getBlockPos(curMinoInfo.shape[i],curMino.pos,curMinoInfo.center,curMino.rotate)
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

function fall() {
	console.log('fall')
	var t = curMino.pos[1]
	curMino.pos[1] --
	if (collision()) {
		curMino.pos[1] = t
		lock()
	}
}

function checkFull() {
	var full = []
	playfield.forEach((e,i,a)=>{
		var flag = true
		for (b of e) {
			if (b.type==-1) {
				flag = false
				break
			}
		}
		if (flag) {
			e.forEach((e,i,a)=>{
				blocks.removeChild(e.object)
			})
			full.splice(0,0,i)
		}
	})
	for (i of full) {
		playfield.splice(i,1)
		var arr = []
		for(var j=0;j<10;j++) {
			arr.push({
				'type': -1,
				'object': null
			})
		}
		playfield.push(arr)
	}
	playfield.forEach((e,y,a)=>{
		e.forEach((e,x,a)=>{
			if (e.type!=-1) {
				e.object.x =  x * 40
				e.object.y = -y * 40 - 40
			}
		})
	})
}

function lock() {
	setMinoPos()
	var curMinoInfo = minoTypes[curMino.type]
	curMinoInfo.shape.forEach((e,i,a)=>{
		var blockPos = getBlockPos(e,curMino.pos,curMinoInfo.center,curMino.rotate)
		var x = blockPos[0]
		var y = blockPos[1]
		playfield[y][x].type = curMino.type
		playfield[y][x].object = curMino.obj[i]
	})
	checkFull()
	newMino()
	actionTimer = 0
}

function moveLeft() {
	var t = curMino.pos[0]
	curMino.pos[0] --
	if (collision()) curMino.pos[0] = t
}

function moveRight() {
	var t = curMino.pos[0]
	curMino.pos[0] ++
	if (collision()) curMino.pos[0] = t
}

function kick(type,x,ct) {
	var curMinoInfo = minoTypes[type]
	var u = curMino.pos
	for (e of curMinoInfo.kick[x][ct>0?0:1]) {
		curMino.pos = [u[0]+e[0],u[1]+e[1]]
		if (!collision()) return true
	}
	curMino.pos = u
	return false
}

function rotate(ct) { // TO FIX
	var t = curMino.rotate
	var u = curMino.pos
	curMino.rotate = (curMino.rotate+4+ct)%4
	if (collision()) {
		if (!kick(curMino.type,t,ct)) curMino.rotate = t
	}
}

function softDrop() {
	var t = curMino.pos[1]
	curMino.pos[1] --
	if (collision()) curMino.pos[1] = t
}

function hardDrop() {
	var t
	while (!collision()) {
		t = curMino.pos[1]
		curMino.pos[1] --
	}
	curMino.pos[1] = t
	lock ()
}

function collision() {
	var curMinoInfo = minoTypes[curMino.type]
	var flag = false
	curMinoInfo.shape.forEach((e,i,a)=>{
		var blockPos = getBlockPos(e,curMino.pos,curMinoInfo.center,curMino.rotate)
		var x = blockPos[0]
		var y = blockPos[1]
		if (x<0||y<0||y>22||x>9) {
			flag = true
			return
		}
		if (playfield[y][x].type != -1) {
			flag = true
			return
		}
	})
	return flag
}

function lose() {
	console.log('lose')
	stateFunction = idle
}

setup()


/*
// Create WebSocket connection.
const socket = new WebSocket('ws://140.112.211.69:2407')

function send(type,data) {
	socket.send(JSON.stringify({
		'type': type,
		'content': data
	}))
}

function ping() {
	var before = Date.now()
	send('PING',{'date':before})
}
//setInterval(ping,1000)

// Connection opened
socket.addEventListener('open', function (event) {
	send('MSG','Hello Server!')
	send('IN','start')
})

// Listen for messages
socket.addEventListener('message', function (event) {
	var data = JSON.parse(event.data)
	if (data.type === 'MSG'){
		console.log('Server: ', data.content)
	}
	else if (data.type === 'PING'){
		var after = Date.now()
		var ping = after - data.content.date
		console.log('Server: ping ' + ping)
	}
})
*/