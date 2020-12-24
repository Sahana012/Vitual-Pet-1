var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var milk;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
}

function setup(){
  createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  database = firebase.database();

  foodS = 50;
  writeStock(foodS);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  milk = createSprite(230,270,10,10);
  milk.addImage(milkImg);
  milk.visible = false;
  milk.scale = 0.02;
  
}


function draw(){  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDogImg);
    milk.visible = true;
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
    milk.visible = false;
    if(foodS<=0){
       foodS = 0;
      }
    else{
      foodS = foodS - 1
    }
    writeStock(foodS);
  }

  drawSprites();

  textSize(17);
  fill(48, 30, 0);
  stroke(0)
  text("I am your puppy Mocha and I am very hungry! ",80,150);
  fill(255, 252, 217);
  text("Press the up arrow key to feed Mocha",100,25);
  fill("white");
  text("Milk Bottles Remaining : " + foodS,150,440);

}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}



