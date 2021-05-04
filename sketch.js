var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var storeFS;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  Feed=createButton("Feed the dog");
  Feed.position(700,95);
  Feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
feedTime = database.ref("FeedTime")
feedTime.on("value",function(data){
  lastFed = data.val();
})
if(lastFed>=12){
  fill ("white")
  strokeWeight(8)
text("Last Feed"+lastFed+" PM",350,30)
}else if(lastFed==0){
  text(" Last Feed : 12 AM ",350,30);
}else{
text(" Last Feed"+lastFed+" AM",350,30)
}
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
storeFS = foodObj.getFoodStock();
if (storeFS<= 0){
  foodObj.updateFoodStock(storeFS*0)
}else {
  foodObj.updateFoodStock(storeFS -1)
}
database.ref("/").update({
  Food : foodObj.getFoodStock(),
FeedTime : hour() 
})

}


