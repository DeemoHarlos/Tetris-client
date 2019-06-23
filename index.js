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
var opTimeout1      = [300,300,300] // down, left, right
var opTimeout2      = [40,40,40] // down, left, right
var opTimer         = [0,0,0] // down, left, right
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
var minoSeq
var nextMino
var curMino
var ghostMino
var shiftMino
var shifted

var blocks
var grid

function shuffle(arr) {
	var i,j,temp
	for (i=arr.length-1;i>0;i--) {
		j = Math.floor(Math.random()*(i+1))
		temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	}
	return arr
}

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
	operationQueue = []
	minoSeq = [2,3,1,5,0,4,6]
	nextMino = []
	curMino = {}
	ghostMino = {}
	shiftMino = {}
	shifted = false

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

	keySetup()

	for (var i=0;i<5;i++) addNextMino()
	newMino()
	stateFunction = run
	action = fall
	app.ticker.add(gameLoop)
}

function gameLoop(delta) {
	frames ++
	stateFunction(app.ticker.elapsedMS)
}

function run(ms) {
	opTimer.forEach((e,i,a)=>a[i]-=ms)
	kd.tick()

	if (operationQueue.length > 0) {
		operationQueue.forEach((e,i,a)=>{
			e()
			setMinoPos(curMino)
			setGhostPos()
		})
		operationQueue = []
	}

	actionTimer -= ms
	if (actionTimer <= 0) {
		action()
		setMinoPos(curMino)
		setGhostPos()
		actionTimer = actionTimeout
	}
}

function keyTimeout(key,to1,to2,i,f) {
	kd[key].press(()=>{
		opTimer[i] = to1
		operationQueue.push(f)
	})
	kd[key].down(()=>{
		while (opTimer[i]<=0) {
			opTimer[i] += to2
			operationQueue.push(f)
		}
	})
}

function keySetup() {
	kd.UP   .press(()=>{operationQueue.push(()=>{rotate( 1)})})
	kd.W    .press(()=>{operationQueue.push(()=>{rotate( 1)})})
	kd.Z    .press(()=>{operationQueue.push(()=>{rotate(-1)})})
	kd.SPACE.press(()=>{operationQueue.push(()=>{hardDrop()})})
	kd.SHIFT.press(()=>{operationQueue.push(()=>{shift()})})

	keyTimeout('S'    ,opTimeout1[0],opTimeout2[0],0,()=>{softDrop ()})
	keyTimeout('DOWN' ,opTimeout1[0],opTimeout2[0],0,()=>{softDrop ()})
	keyTimeout('A'    ,opTimeout1[1],opTimeout2[1],1,()=>{moveLeft ()})
	keyTimeout('LEFT' ,opTimeout1[1],opTimeout2[1],1,()=>{moveLeft ()})
	keyTimeout('D'    ,opTimeout1[2],opTimeout2[2],2,()=>{moveRight()})
	keyTimeout('RIGHT',opTimeout1[2],opTimeout2[2],2,()=>{moveRight()})
}

function onKeyDown(key) {
	if (stateFunction===run) opHandle(key,1)
}

function onKeyUp(key) {
	if (stateFunction===run) opHandle(key,0)
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

function newGhostMino() {
	ghostMino.type = curMino.type
	ghostMino.pos = [curMino.pos[0],curMino.pos[1]]
	ghostMino.rotate = curMino.rotate
	if(ghostMino.obj) ghostMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
	ghostMino.obj = drawGhostMino(curMino)
	setGhostPos()
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

function setMinoPos(cur) {
	var curMinoInfo = minoTypes[cur.type]
	cur.obj.forEach((e,i,a)=>{
		var blockPos = getBlockPos(curMinoInfo.shape[i],cur.pos,curMinoInfo.center,cur.rotate)
		e.x =  blockPos[0] * 40
		e.y = -blockPos[1] * 40 - 40
	})
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
	if (collision(curMino)) {
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
	setMinoPos(curMino)
	var curMinoInfo = minoTypes[curMino.type]
	curMinoInfo.shape.forEach((e,i,a)=>{
		var blockPos = getBlockPos(e,curMino.pos,curMinoInfo.center,curMino.rotate)
		var x = blockPos[0]
		var y = blockPos[1]
		playfield[y][x].type = curMino.type
		playfield[y][x].object = curMino.obj[i]
	})
	checkFull()
	shifted = false
	newMino()
	actionTimer = 0
}

function shift() {
	if (!shifted) {
		var tempMino = shiftMino
		shifted = true
		shiftMino = curMino
		shiftMino.pos = [-5,18]
		setMinoPos(shiftMino)
		if (tempMino.type == undefined) newMino()
		else {
			curMino = tempMino
			curMino.pos = [4,19]
			curMino.rotate = 0
			if (collision(curMino)) curMino.pos = [4,20]
			setMinoPos(curMino)

			if (collision(curMino)) lose()
			else newGhostMino()
		}
	}
}

function moveLeft() {
	var t = curMino.pos[0]
	curMino.pos[0] --
	if (collision(curMino)) curMino.pos[0] = t
}

function moveRight() {
	var t = curMino.pos[0]
	curMino.pos[0] ++
	if (collision(curMino)) curMino.pos[0] = t
}

function kick(type,x,ct) {
	var curMinoInfo = minoTypes[type]
	var u = curMino.pos
	for (e of curMinoInfo.kick[x][ct>0?0:1]) {
		curMino.pos = [u[0]+e[0],u[1]+e[1]]
		if (!collision(curMino)) return true
	}
	curMino.pos = u
	return false
}

function rotate(ct) { // TO FIX
	var t = curMino.rotate
	var u = curMino.pos
	curMino.rotate = (curMino.rotate+4+ct)%4
	if (collision(curMino)) {
		if (!kick(curMino.type,t,ct)) curMino.rotate = t
	}
}

function softDrop() {
	var t = curMino.pos[1]
	curMino.pos[1] --
	if (collision(curMino)) curMino.pos[1] = t
	else actionTimer = actionTimeout
}

function hardDrop() {
	var t
	while (!collision(curMino)) {
		t = curMino.pos[1]
		curMino.pos[1] --
	}
	curMino.pos[1] = t
	lock ()
}

function collision(cur) {
	var curMinoInfo = minoTypes[cur.type]
	var flag = false
	curMinoInfo.shape.forEach((e,i,a)=>{
		var blockPos = getBlockPos(e,cur.pos,curMinoInfo.center,cur.rotate)
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
	if(ghostMino.obj) ghostMino.obj.forEach((e,i,a)=>{blocks.removeChild(e)})
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