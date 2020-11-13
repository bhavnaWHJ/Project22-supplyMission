//declaring the variable
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,background, backgroundImage;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//creating preload function
function preload(){

	//loading Images here
	backgroundImage = loadImage("alienCity.jpg")
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")

}

//creating setup function
function setup() {

	//creating canvas
	createCanvas(800, 700);

	//make rect mode to center
	rectMode(CENTER);
	
    //creating sprite, adding Images and scaling
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

    //creating image
	engine = Engine.create();
	world = engine.world;

	//creating package body 
    packageBody = Bodies.circle(width/2 , 200 , 5, {restitution:0.8});
	Matter.Body.setStatic(packageBody, true);
	World.add(world, packageBody);
	

	//Creating a Ground
	ground = Bodies.rectangle(width/2, 550, width, 10 , {isStatic:true} );
	World.add(world, ground);
	ground.visible = false;

	//creating background, adding Images and scaling
	background = createSprite(400, 350);
	background.addImage("background", backgroundImage);
	background.scale = 0.5;

	//run the engine
	Engine.run(engine);
  
}

//creating draw function
function draw() {

  //make rect mode to center	
  rectMode(CENTER);

  //update the engine
  Engine.update(engine);

  

  

  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  if(keyDown(RIGHT_ARROW)){
	helicopterSprite.x = helicopterSprite.x+1;  
	packageBody.position.x = packageBody.position.x+1;
}

 if(keyDown(LEFT_ARROW)){
	helicopterSprite.x = helicopterSprite.x-1;  
	packageBody.position.x = packageBody.position.x-1;
 }

  keyPressed();

  //making package depth and helicopter depth more than background depth
  background.depth = helicopterSprite.depth;
  helicopterSprite.depth = helicopterSprite.depth + 1;

  background.depth = packageSprite.depth;
  packageSprite.depth = packageSprite.depth + 1;
  

  //draw the sprites
  drawSprites();
 
}

//creating key pressed function
function keyPressed() {

     //giving condition when key pressed down arrow key
     if (keyDown(DOWN_ARROW)) {
	 
	     Matter.Body.setStatic(packageBody, false);
	  
     }

}