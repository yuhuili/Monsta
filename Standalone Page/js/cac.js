<!-- Copyright 2014 Ayogo Health Inc. -->
// JavaScript Document
var stage;

var coinArrayX = []; // x coordinates of all coins
var coinArrayY = []; // y coordinates of all coins
var obstacleX; // x coordinate of the obstacle
var obstacleY; // y coordinate of the obstacle

var coin1, coin2, coin3, bomb, obstacle, dragger; // three coins, a monster, and a draggable container

var STAGE_WIDTH=400;
var STAGE_HEIGHT=250;
var STAGE_COLOR="#bbbbbb";
var MAIN_VIEW_WIDTH=STAGE_WIDTH;
var MAIN_VIEW_HEIGHT=STAGE_HEIGHT-50;
var MAIN_VIEW_COLOR="#888888";

var INSTRUCTION_X=20;
var INSTRUCTION_Y=30;
var INSTRUCTION_TEXT="Eat all Coins";
var INSTRUCTION_FONT="20px 'Fjalla One'";
var INSTRUCTION_COLOR="#ffffff";

var OBJECT_X_RANGE=350;
var OBJECT_X_OFFSET=0;
var OBJECT_Y_RANGE=130;
var OBJECT_Y_OFFSET=20;
var OBSTACLE_X_RANGE=340;
var OBSTACLE_X_OFFSET=0;
var OBSTACLE_Y_RANGE=130;
var OBSTACLE_Y_OFFSET=10;

var SUCCESSCODE=10410;
var SUCCESS=SUCCESSCODE;


var RESET_BUTTON_BG_RECT = new Object();
RESET_BUTTON_BG_RECT.x=355;
RESET_BUTTON_BG_RECT.y=225;
RESET_BUTTON_BG_RECT.r=17;

var RESET_BUTTON_RECT = new Object();
RESET_BUTTON_RECT.x=355;
RESET_BUTTON_RECT.y=225;
RESET_BUTTON_RECT.r=15;

var resetButton;

var COIN_IMAGE = new Image();
COIN_IMAGE.onload = updateStage;
COIN_IMAGE.src = "coin.png";

var MONSTER_IMAGE = new Image();
MONSTER_IMAGE.onload = updateStage;
MONSTER_IMAGE.src = "monster.png";

var BOMB_IMAGE = new Image();
BOMB_IMAGE.onload = updateStage;
BOMB_IMAGE.src = "bomb_40x40.png";

var BACKGROUND_IMAGE = new Image();
BACKGROUND_IMAGE.onload = updateStage;
BACKGROUND_IMAGE.src = "background-captcha.jpg";

var gridW = Math.floor(280 / 40);
var gridH = Math.floor(120 / 40);

var filledPositions = [];

function updateStage() {
	if (bomb) {
		bomb.rotation++;
	}
	if (stage){
    	stage.update();
	}
}

function resetStage() {
	stage.clear();
	stage.update();
	init();
}

function init() {
	createjs.Ticker.addEventListener("tick", updateStage);
	
	//Initialise empty grid (2-dimensional array)
	for (var i=0; i<gridW; i++) {
		filledPositions.push(new Array(gridH));
	}
	
	// Initialize the stage
	stage = new createjs.Stage("myCanvas");
	stage.enableMouseOver(55);
	
	
	// Load backgrounds
	var background = new createjs.Shape();
	background.graphics.beginFill(STAGE_COLOR).drawRoundRectComplex(0,MAIN_VIEW_HEIGHT,STAGE_WIDTH,STAGE_HEIGHT-MAIN_VIEW_HEIGHT,0,0,10,10);
	stage.addChild(background);

	// Background image
	var background2 = new createjs.Bitmap(BACKGROUND_IMAGE);
	stage.addChild(background2);
	
	
	// Create items on stage
	createObstacles(stage);
	createCoins();
	createBomb();
	
	// Add instructions
	var instructionTextBG = new createjs.Text(INSTRUCTION_TEXT, INSTRUCTION_FONT, INSTRUCTION_COLOR);
	instructionTextBG.outline=3;
	instructionTextBG.color="#9100D9";
	instructionTextBG.x=INSTRUCTION_X;
	instructionTextBG.y=INSTRUCTION_Y;
	instructionTextBG.textBaseline="alphabetic";
	stage.addChild(instructionTextBG);
	
	var instructionText = new createjs.Text(INSTRUCTION_TEXT, INSTRUCTION_FONT, INSTRUCTION_COLOR);
	instructionText.x=INSTRUCTION_X;
	instructionText.y=INSTRUCTION_Y;
	instructionText.textBaseline="alphabetic";
	stage.addChild(instructionText);
	
	stage.update();
}

function cursorPointer(event) {
	event.currentTarget.graphics.clear().beginFill("#ffffff").drawCircle(RESET_BUTTON_RECT.x,RESET_BUTTON_RECT.y,RESET_BUTTON_RECT.z).endFill();
	document.body.style.cursor='pointer';
	stage.update();
}

function cursorDefault(event) {
	event.currentTarget.graphics.clear().beginFill("#cccccc").drawCircle(RESET_BUTTON_RECT.x,RESET_BUTTON_RECT.y,RESET_BUTTON_RECT.z).endFill();
	document.body.style.cursor='default';
	stage.update();
}

function createCoins() {
	// Create three coins
	
	var random1 = assignNewPosition();
	coin1 = new createjs.Bitmap(COIN_IMAGE);
	coin1.x=random1.x;
	coin1.y=random1.y;
	
	var random2 = assignNewPosition();
	coin2 = new createjs.Bitmap(COIN_IMAGE);
	coin2.x=random2.x;
	coin2.y=random2.y;
	
	var random3 = assignNewPosition();
	coin3 = new createjs.Bitmap(COIN_IMAGE);
	coin3.x=random3.x;
	coin3.y=random1.y;
	
	// Coins animating
	createjs.Tween.get(coin1, {loop:true}).to({y:coin1.y-3}, 300).to({y:coin1.y}, 800);
	createjs.Tween.get(coin2, {loop:true}).to({y:coin2.y-3}, 300).to({y:coin2.y}, 800);
	createjs.Tween.get(coin3, {loop:true}).to({y:coin3.y-3}, 300).to({y:coin3.y}, 800);
	
	stage.addChild(coin1);
	stage.addChild(coin2);
	stage.addChild(coin3);
}

function createBomb() {
	var random1 = assignNewPosition();
	bomb = new createjs.Bitmap(BOMB_IMAGE);
	bomb.x=random1.x;
	bomb.y=random1.y;
	
	bomb.regX = bomb.regY = 20;
	
	stage.addChild(bomb);
}

function createObstacles(stage) {
	// Create monster
	obstacle = new createjs.Bitmap(MONSTER_IMAGE);
	obstacleX = Math.random()*OBSTACLE_X_RANGE+OBSTACLE_X_OFFSET;
	obstacleY = Math.random()*OBSTACLE_Y_RANGE+OBSTACLE_Y_OFFSET;
	//obstacle.addEventListener("click", handleClickBad);
	
	dragger = new createjs.Container();
	dragger.x = obstacleX;
	dragger.y = obstacleY;
	dragger.addChild(obstacle);
	stage.addChild(dragger);
	
	dragger.on("pressmove",function(evt) {
		// currentTarget will be the container that the event listener was added to:
		evt.currentTarget.x = evt.stageX-50;
		evt.currentTarget.y = evt.stageY-50;
		if(evt.stageY > 180) evt.currentTarget.y=180-50;
		eatTest();
		// make sure to redraw the stage to show the change:
		stage.update();
		if(SUCCESS==SUCCESSCODE) checkStatus();
	});
}

function eatTest() {
	var pt0 = obstacle.localToLocal(20,20,bomb);
	if (bomb.hitTest(pt0.x, pt0.y)) { dragger.removeAllEventListeners();console.log("reset");setTimeout(resetStage(), 50);}
	
	var pt1 = obstacle.localToLocal(20,20,coin1);
	if (coin1.hitTest(pt1.x, pt1.y)) { stage.removeChild(coin1); }
	var pt2 = obstacle.localToLocal(20,20,coin2);
	if (coin2.hitTest(pt2.x, pt2.y)) { stage.removeChild(coin2); }
	var pt3 = obstacle.localToLocal(20,20,coin3);
	if (coin3.hitTest(pt3.x, pt3.y)) { stage.removeChild(coin3); }
}

//Try random grid positions until an empty one is found, then mark it as filled and return a position object
function assignNewPosition() {
	var pos = {};
	do {
		pos.x = Math.floor(Math.random() * gridW);
		pos.y = Math.floor(Math.random() * gridH);
	} while (filledPositions[pos.x][pos.y]);
	
	filledPositions[pos.x][pos.y] = true;
	
	pos.x=pos.x*40+30+Math.floor(Math.random()*26-13);
	pos.y=pos.y*40+30+Math.floor(Math.random()*26-13);
	
	return pos;
}

function checkStatus() {
	if (!stage.contains(coin1)&&!stage.contains(coin2)&&!stage.contains(coin3)) {
		SUCCESS=10880; // random number
		stage.removeChild(dragger);
		stage.removeChild(bomb);
		stage.update();
		
		// Hide html buttons
		document.getElementById("cac_accessibility_button").style.visibility="hidden";
		document.getElementById("cac_question_button").style.visibility="hidden";
		document.getElementById("cac_reset_button").style.visibility="hidden";
		
		alert("completed");
	}
}