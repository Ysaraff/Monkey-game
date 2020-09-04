var banana, bananaImage, obstacle, obstacleImage, obstaclesGroup, Background1, background1Image, score, player, playerRunning, foodGroup, ground;

function preload(){
 background1Image = loadImage("jungle.jpg");
  playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  Background1 = createSprite(200,200,800,400);
  Background1.addImage("jungle",background1Image);
  player = createSprite(50,349,50,50);
  player.addAnimation("running",playerRunning);
  player.scale = 0.1;
  ground = createSprite(200,350,800,10);
  ground.visible = false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(220);
  Background1.velocityX = -3
  if(Background1.x < 0){
    Background1.x = Background1.width/2;
  }
   ground.velocityX = -3;
  if(ground.x < 0){
   ground.x = ground.width/2; 
  }
  player.collide(ground);
   
  if(player.isTouching(foodGroup)){
   score = score+2;
    foodGroup.destroyEach();
  }
  
  if(keyDown("space")&&player.y > 314.8){
   player.velocityY = -7; 
  }
  player.velocityY = player.velocityY+0.5;
  
  switch(score){
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
      default: break;
  }
  
  if(player.isTouching(obstaclesGroup)){
     player.scale = 0.1;
    obstaclesGroup.destroyEach();
     }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,200,50);
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
}
function spawnFood(){
  if(World.frameCount%80 === 0){
   banana = createSprite(400,250,50,50);
    banana.scale = 0.05;
    banana.addImage("banana",bananaImage);
    banana.velocityX = -3
    banana.lifetime = 150;
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(World.frameCount%300 === 0){
   obstacle = createSprite(400,350,50,50);
    obstacle.scale = 0.15;
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 150;
    obstaclesGroup.add(obstacle);
  }
}