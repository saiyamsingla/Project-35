var balloon , balloonAnimation;
var balloonImage;
var ballonPosition;
var position;



function preload(){
balloonAnimation=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
balloonImage=loadImage("Hot Air Ballon-02.png");

backgroundImg=loadImage("Hot Air Ballon-01.png")
}


function setup() {
  db=firebase.database();
  console.log(db);

  createCanvas(1200,600);
  
 balloon=createSprite(250,250,100,100);
 balloon.addImage(balloonImage);
 balloon.scale=0.5;

 ballonPosition=db.ref('balloon/height');
 ballonPosition.on("value",readPosition,showError);
 

}
function draw() {
  background(backgroundImg);  
  if(position!==undefined){
  if(keyDown(UP_ARROW)){
    writePosition(0,-10)
  
  }
 else if(keyDown(DOWN_ARROW)){
   writePosition(0,+10);
 }
 else if(keyDown(LEFT_ARROW)){
  writePosition(-10,0)
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(10,0)
}
 
 
  drawSprites();
}
}


/*function changePosition(x,y){
  balloon.x=balloon.x + x;
  balloon.y=balloon.y + y;

}*/

function writePosition(x,y)
{
  db.ref('balloon/height').set(
    {
      'x': position.x+x,
      'y': position.y+y
    }
  )
  
}

function readPosition(data){
  position=data.val();
console.log(data);

balloon.x=position.x;
balloon.y=position.y;
}

function showError(){
  text("Error Found");
}