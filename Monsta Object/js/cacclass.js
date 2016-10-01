<!-- Copyright 2014 Ayogo Health Inc. -->
// JavaScript Document

// Monsta Object Declaration

var monstaStage;

function Monsta(monstaCanvas,createjsVarName) {
	this.failed=false;
	this.coinArrayX = []; // x coordinates of all coins
	this.coinArrayY = []; // y coordinates of all coins
	
	monstaStage_WIDTH=400;
	monstaStage_HEIGHT=250;
	monstaStage_COLOR="#bbbbbb";
	this.MAIN_VIEW_WIDTH=monstaStage_WIDTH;
	this.MAIN_VIEW_HEIGHT=monstaStage_HEIGHT-50;
	this.MAIN_VIEW_COLOR="#888888";
	
	this.INSTRUCTION_X=20;
	this.INSTRUCTION_Y=30;
	this.INSTRUCTION_TEXT="Eat all Coins";
	this.INSTRUCTION_FONT="20px 'Fjalla One'";
	this.INSTRUCTION_COLOR="#ffffff";
	
	this.COMPLETED_X=77;
	this.COMPLETED_Y=130;
	this.COMPLETED_TEXT="COMPLETED";
	this.COMPLETED_FONT="60px 'Fjalla One'";
	this.COMPLETED_COLOR="#ffffff";
	
	this.FAILED_X=100;
	this.FAILED_Y=130;
	this.FAILED_TEXT="Try Again";
	this.FAILED_FONT="60px 'Fjalla One'";
	this.FAILED_COLOR="#ffffff";
	
	this.OBJECT_X_RANGE=350;
	this.OBJECT_X_OFFSET=0;
	this.OBJECT_Y_RANGE=130;
	this.OBJECT_Y_OFFSET=20;
	this.MONSTER_X_RANGE=340;
	this.MONSTER_X_OFFSET=0;
	this.MONSTER_Y_RANGE=130;
	this.MONSTER_Y_OFFSET=10;
	
	this.CHENGGONGCODE=10410;
	this.CHENGGONG=this.CHENGGONGCODE;
	
	
	this.RESET_BUTTON_BG_RECT = new Object();
	this.RESET_BUTTON_BG_RECT.x=355;
	this.RESET_BUTTON_BG_RECT.y=225;
	this.RESET_BUTTON_BG_RECT.r=17;
	
	this.RESET_BUTTON_RECT = new Object();
	this.RESET_BUTTON_RECT.x=355;
	this.RESET_BUTTON_RECT.y=225;
	this.RESET_BUTTON_RECT.r=15;
	
	this.COIN_IMAGE = new Image();
	this.COIN_IMAGE.onload = monstaUpdateStage(monstaStage);
	this.COIN_IMAGE.src = "coin.png";
	
	this.MONSTER_IMAGE = new Image();
	this.MONSTER_IMAGE.onload = monstaUpdateStage(monstaStage);
	this.MONSTER_IMAGE.src = "monster.png";
	
	this.BOMB_IMAGE = new Image();
	this.BOMB_IMAGE.onload = monstaUpdateStage(monstaStage);
	this.BOMB_IMAGE.src = "bomb.png";
	
	this.BOMB2_IMAGE = new Image();
	this.BOMB2_IMAGE.onload = monstaUpdateStage(monstaStage);
	this.BOMB2_IMAGE.src = "bomb2.png";
	
	this.BACKGROUND_IMAGE = new Image();
	this.BACKGROUND_IMAGE.onload = monstaUpdateStage(monstaStage);
	this.BACKGROUND_IMAGE.src = "background-captcha1.jpg";
	
	this.gridW = Math.floor(280 / 40);
	this.gridH = Math.floor(120 / 40);
	
	this.firstTime=1;
	
	this.init = function() {
		// Insert HTML buttons
		/*
<a href="javascript:resetStage()" id="cac_reset_button" class="cac_html_button" style="position:absolute;left:250px;top:210px;z-index:10"><i class="fa fa-rotate-right fa-2x"></i></a>
<a href="javascript:void(0)" id="cac_accessibility_button" class="cac_html_button" style="position:absolute;left:305px;top:210px;z-index:10"><i class="fa fa-wheelchair fa-2x"></i></a>
<a href="javascript:void(0)" id="cac_question_button" class="cac_html_button"  style="position:absolute;left:360px;top:210px;z-index:10"><i class="fa fa-question fa-2x"></i></a>
*/
    var randBG = Math.random()*3;
    if (randBG > 2)
      this.BACKGROUND_IMAGE.src = "background-captcha3.jpg";
    else if (randBG > 1)
      this.BACKGROUND_IMAGE.src = "background-captcha2.jpg";
    
		if($("#cac_reset_button").length == 0) {
			//it doesn't exist
			$("<a href=\"javascript:captcha.resetStage()\" id=\"cac_reset_button\" class=\"cac_html_button\" style=\"position:absolute;left:250px;top:210px;z-index:10\"><i class=\"fa fa-rotate-right fa-2x\"><\/i><\/a><a href=\"javascript:void(0)\" id=\"cac_accessibility_button\" class=\"cac_html_button\" style=\"position:absolute;left:305px;top:210px;z-index:10\"><i class=\"fa fa-wheelchair fa-2x\"><\/i><\/a><a href=\"javascript:void(0)\" id=\"cac_question_button\" class=\"cac_html_button\"  style=\"position:absolute;left:360px;top:210px;z-index:10\"><i class=\"fa fa-question fa-2x\"><\/i><\/a>").insertAfter("#"+monstaCanvas);
		}
		
		this.fistTime=0;
		this.filledPositions = [];
		//Initialise empty grid (2-dimensional array)
		for (var i=0; i<this.gridW; i++) {
			this.filledPositions.push(new Array(this.gridH));
		}
		
		// Initialize the stage
		monstaStage = new createjs.Stage(monstaCanvas);
		monstaStage.enableMouseOver(55);
		
		//createjs.Ticker.addEventListener("tick", monstaUpdateStage(monstaStage));
		setInterval(function() {
			monstaUpdateStage(monstaStage);
		}, 1);
		
		// Load backgrounds
		this.background = new createjs.Shape();
		this.background.graphics.beginFill(monstaStage_COLOR).drawRoundRectComplex(0,this.MAIN_VIEW_HEIGHT,monstaStage_WIDTH,monstaStage_HEIGHT-this.MAIN_VIEW_HEIGHT,0,0,10,10);
		monstaStage.addChild(this.background);
	
		// Background image
		this.background2 = new createjs.Bitmap(this.BACKGROUND_IMAGE);
		monstaStage.addChild(this.background2);
	}
	
	// Create items on stage
	this.createMonster = function() {
		// Create monster
		this.monster = new createjs.Bitmap(this.MONSTER_IMAGE);
		
		var rand = this.assignNewPositionMonster();
		this.monsterX = rand.x;
		this.monsterY = rand.y;
		//this.monsterX = Math.random()*this.MONSTER_X_RANGE+this.MONSTER_X_OFFSET;
		//this.monsterY = Math.random()*this.MONSTER_Y_RANGE+this.MONSTER_Y_OFFSET;
		//obstacle.addEventListener("click", handleClickBad);
		
		this.dragger = new createjs.Container();
		this.dragger.x = this.monsterX;
		this.dragger.y = this.monsterY;
		this.dragger.addChild(this.monster);
		monstaStage.addChild(this.dragger);
		
		myMonsta=this;
		
		this.dragger.on("pressmove",function(evt) {
			// currentTarget will be the container that the event listener was added to:
			evt.currentTarget.x = evt.stageX-50;
			evt.currentTarget.y = evt.stageY-50;
			if(evt.stageY > 180) evt.currentTarget.y=180-50;
			myMonsta.eatTest();
			// make sure to redraw the stage to show the change:
			monstaStage.update();
			if(this.CHENGGONG==this.CHENGGONGCODE) this.checkStatus;
		});
	};
	
	this.eatTest = function() {
		var pt0 = this.monster.localToLocal(20,20,this.bomb);
		if (this.bomb.hitTest(pt0.x, pt0.y)) { 
			this.dragger.removeAllEventListeners();
			this.failed=true;
			this.showFailed();
			myMonsta=this;
			setTimeout(function() {myMonsta.restart()},1000);
		}
		
		var pt1 = this.monster.localToLocal(20,20,this.coin1);
		if (this.coin1.hitTest(pt1.x, pt1.y)) { monstaStage.removeChild(this.coin1); }
		var pt2 = this.monster.localToLocal(20,20,this.coin2);
		if (this.coin2.hitTest(pt2.x, pt2.y)) { monstaStage.removeChild(this.coin2); }
		var pt3 = this.monster.localToLocal(20,20,this.coin3);
		if (this.coin3.hitTest(pt3.x, pt3.y)) { monstaStage.removeChild(this.coin3); }
		
		this.checkStatus();
	}
	
	this.createCoins = function() {
		// Create three coins
		var random1 = this.assignNewPosition();
		this.coin1 = new createjs.Bitmap(this.COIN_IMAGE);
		this.coin1.x=random1.x;
		this.coin1.y=random1.y;
		
		var random2 = this.assignNewPosition();
		this.coin2 = new createjs.Bitmap(this.COIN_IMAGE);
		this.coin2.x=random2.x;
		this.coin2.y=random2.y;
		
		var random3 = this.assignNewPosition();
		this.coin3 = new createjs.Bitmap(this.COIN_IMAGE);
		this.coin3.x=random3.x;
		this.coin3.y=random1.y;
		
		// Coins animating
		createjs.Tween.get(this.coin1, {loop:true}).to({y:this.coin1.y-3}, 300).to({y:this.coin1.y}, 800);
		createjs.Tween.get(this.coin2, {loop:true}).to({y:this.coin2.y-3}, 300).to({y:this.coin2.y}, 800);
		createjs.Tween.get(this.coin3, {loop:true}).to({y:this.coin3.y-3}, 300).to({y:this.coin3.y}, 800);
		
		monstaStage.addChild(this.coin1);
		monstaStage.addChild(this.coin2);
		monstaStage.addChild(this.coin3);
	}
	
	this.checkStatus = function() {
		if (!monstaStage.contains(this.coin1)&&!monstaStage.contains(this.coin2)&&!monstaStage.contains(this.coin3)&&this.CHENGGONG!=10880) {
			this.CHENGGONG=10880; // random number
			monstaStage.removeChild(this.dragger);
			monstaStage.removeChild(this.bomb);
			this.showCompleted();
			monstaStage.update();
			
			// Hide html buttons
			document.getElementById("cac_accessibility_button").style.visibility="hidden";
			document.getElementById("cac_question_button").style.visibility="hidden";
			document.getElementById("cac_reset_button").style.visibility="hidden";
			
			//alert("completed");
		}
	}
	
	this.timer1;
	
	this.createBomb = function() {
		var random1 = this.assignNewPositionBomb();
		this.bomb = new createjs.Bitmap(this.BOMB_IMAGE);
		this.bomb.x=random1.x;
		this.bomb.y=random1.y;
		
		//this.bomb.regX = this.bomb.regY = 20;
		
		createjs.Tween.get(this.bomb, {loop:true}).to({y:this.bomb.y-8}, 400).to({y:this.bomb.y}, 1000);
		
		monstaStage.addChild(this.bomb);
		
		thisBomb=this.bomb;
		thisImage1=this.BOMB_IMAGE;
		thisImage2=this.BOMB2_IMAGE;
		
		
		this.timer1=setInterval(function() {
			monstaUpdateBomb(thisBomb, thisImage1, thisImage2);
		}, 50);
	}
	
	this.assignNewPositionMonster = function() {
		//Try random grid positions until an empty one is found, then mark it as filled and return a position object
		var pos = {};
		do {
			pos.x = Math.floor(Math.random() * this.gridW);
			pos.y = Math.floor(Math.random() * this.gridH);
		} while (this.filledPositions[pos.x][pos.y]||pos.x>this.filledPositions.length-3||pos.y>this.filledPositions[pos.x].length-2);
		
		
		// Monster fill surrounding cells
		for (var i=0;i<3;i++) {
			for (var j=0;j<2;j++) {
				console.log("pos x:"+pos.x+" i:"+i+" y:"+pos.y+" j:"+j);
				this.filledPositions[pos.x+i][pos.y+j] = true;
				console.log("covered:x"+(pos.x+i)+" y:"+(pos.y+j));
			}
		}
		
		if (pos.x!=0) {
			this.filledPositions[pos.x-1][pos.y] = true;
			if (pos.y!=this.filledPositions[pos.x].length-1) {
				this.filledPositions[pos.x-1][pos.y+1] = true;
			}
		}
		
		
		
		//console.log("x:"+pos.x+" y:"+pos.y);
		pos.x=pos.x*40+30;
		pos.y=pos.y*40+30;
		
		return pos;
	}
	
	this.assignNewPositionBomb = function() {
		//Try random grid positions until an empty one is found, then mark it as filled and return a position object
		var pos = {};
		do {
			pos.x = Math.floor(Math.random() * this.gridW);
			pos.y = Math.floor(Math.random() * this.gridH);
		} while (this.filledPositions[pos.x][pos.y]);
		
		this.filledPositions[pos.x][pos.y] = true;
		
		if (pos.y!=this.filledPositions[pos.x].length-1&&this.filledPositions[pos.x][pos.y+1]==false) {
			this.filledPositions[pos.x][pos.y+1] = true;
		}
		else if (pos.y!=0&&this.filledPositions[pos.x][pos.y-1]==false) {
			this.filledPositions[pos.x][pos.y-1] = true;
		}
		
		//console.log("x:"+pos.x+" y:"+pos.y);
		console.log("covered:x"+pos.x+" y:"+pos.y);
		pos.x=pos.x*40+30;
		pos.y=pos.y*40+30;
		
		return pos;
	}
	
	this.assignNewPosition = function() {
		//Try random grid positions until an empty one is found, then mark it as filled and return a position object
		var pos = {};
		do {
			pos.x = Math.floor(Math.random() * this.gridW);
			pos.y = Math.floor(Math.random() * this.gridH);
		} while (this.filledPositions[pos.x][pos.y]);
		
		this.filledPositions[pos.x][pos.y] = true;
		//console.log("x:"+pos.x+" y:"+pos.y);
		console.log("covered:x"+pos.x+" y:"+pos.y);
		pos.x=pos.x*40+30;
		pos.y=pos.y*40+30;
		
		return pos;
	}
	
	this.addInstructions = function() {
		// Add instructions
		this.instructionTextBG = new createjs.Text(this.INSTRUCTION_TEXT, this.INSTRUCTION_FONT, this.INSTRUCTION_COLOR);
		this.instructionTextBG.outline=3;
		this.instructionTextBG.color="#9100D9";
		this.instructionTextBG.x=this.INSTRUCTION_X;
		this.instructionTextBG.y=this.INSTRUCTION_Y;
		this.instructionTextBG.textBaseline="alphabetic";
		monstaStage.addChild(this.instructionTextBG);
		
		this.instructionText = new createjs.Text(this.INSTRUCTION_TEXT, this.INSTRUCTION_FONT, this.INSTRUCTION_COLOR);
		this.instructionText.x=this.INSTRUCTION_X;
		this.instructionText.y=this.INSTRUCTION_Y;
		this.instructionText.textBaseline="alphabetic";
		monstaStage.addChild(this.instructionText);
	}
	
	this.showCompleted = function() {
		this.completedTextBG = new createjs.Text(this.COMPLETED_TEXT, this.COMPLETED_FONT, this.COMPLETED_COLOR);
		this.completedTextBG.outline=3;
		this.completedTextBG.color="#9100D9";
		this.completedTextBG.x=this.COMPLETED_X;
		this.completedTextBG.y=this.COMPLETED_Y;
		this.completedTextBG.textBaseline="alphabetic";
		monstaStage.addChild(this.completedTextBG);
		
		this.completedText = new createjs.Text(this.COMPLETED_TEXT, this.COMPLETED_FONT, this.COMPLETED_COLOR);
		this.completedText.x=this.COMPLETED_X;
		this.completedText.y=this.COMPLETED_Y;
		this.completedText.textBaseline="alphabetic";
		monstaStage.addChild(this.completedText);
		
		if (typeof this.onSuccess === "function") { 
			this.onSuccess();
		}
		clearInterval(this.timer1);
	}
	
	this.showFailed = function() {
		this.FAILEDTEXTBG = new createjs.Text(this.FAILED_TEXT, this.FAILED_FONT, this.FAILED_COLOR);
		this.FAILEDTEXTBG.outline=3;
		this.FAILEDTEXTBG.color="#9100D9";
		this.FAILEDTEXTBG.x=this.FAILED_X;
		this.FAILEDTEXTBG.y=this.FAILED_Y;
		this.FAILEDTEXTBG.textBaseline="alphabetic";
		monstaStage.addChild(this.FAILEDTEXTBG);
		
		this.FAILEDTEXT = new createjs.Text(this.FAILED_TEXT, this.FAILED_FONT, this.FAILED_COLOR);
		this.FAILEDTEXT.x=this.FAILED_X;
		this.FAILEDTEXT.y=this.FAILED_Y;
		this.FAILEDTEXT.textBaseline="alphabetic";
		monstaStage.addChild(this.FAILEDTEXT);
	}
	
	this.restart = function() {
		if (this.failed) {
			this.failed=false;
			this.resetStage();
		}
	}
	
	this.resetStage = function() {
		this.failed=false;
		monstaStage.clear();
		this.init();
		this.createCoins();
		this.createBomb();
		this.createMonster();
		this.addInstructions();
	}
	
	
	
	this.init();
	this.createMonster();
	this.createBomb();
	this.createCoins();
	this.addInstructions();
	
	monstaStage.update();
}

function monstaUpdateStage(monstaStage) {
	if (document.hidden) return;
	if (monstaStage){
    	monstaStage.update();
	}
}

bombBitmap=true;


function monstaUpdateBomb(bomb,BOMB_IMAGE, BOMB2_IMAGE) {
	if (document.hidden) return;
	if (bombBitmap) {
		bomb.image=BOMB_IMAGE;
	}
	else {
		bomb.image=BOMB2_IMAGE;
	}
	bombBitmap=!bombBitmap;
}

function monstaRestart(monsta) {
	monsta.restart();
}