// declaring global variables
var towerImg, tower;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("forest.png");
  climberImg = loadImage("branch.png");
  ghostImg = loadImage("fairy.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

}

function draw() {
  background("black");
  if(gameState === "play"){

    if(tower.y > 400){
        tower.y = 300
      }

    if(keyDown("RIGHT_ARROW")){
      ghost.x += 4;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x -= 4;
    }
    if(keyDown("UP_ARROW")){
      ghost.velocityY = -10;
    }
    ghost.velocityY += 0.3;
    if (ghost.y > 600 || ghost.isTouching (invisibleBlockGroup)){
      gameState = "end";

    }
    if(ghost.isTouching (climbersGroup)){
      ghost.velocityY = 0;
    }
    
    spawnObjects();
    drawSprites();

  }

  if(gameState === "end"){
    textSize(44);
    fill("pink");
    text("Game Over!",190,300);
  }
}

function spawnObjects(){
  if(frameCount % 160 === 0){

    climber = createSprite(door.x, 20);
    climber.addImage("climber", climberImg);
    climber.velocityY = 2;
    climbersGroup.add (climber);

    invisibleBlock = createSprite(door.x,30,95,10);
    invisibleBlock.velocityY = 2;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add (invisibleBlock);
    ghost.depth = invisibleBlock.depth +1;
  }

}
