window.onload = init; // Wait for the page to load before we begin animation
var canvas;
var ctx;// This is a better name for a global variable
var w = 20;
var cols, rows;
var score = 0;
var buttonW, buttonH, buttonX, buttonY;
var splash = new Image(); //load splash screen
var endGame = new Image(); //load end screen
splash.src = 'splash.png'; //set sources for the images
endGame.src = 'endScreen.png';

function init(){
  canvas = document.getElementById('cnv');
  // Set the dimensions of the canvas
  canvas.width = 800;
  canvas.height = 800;
  rows = canvas.height/w; //set number of rows
  cols = canvas.width/w; //set number of cols
  canvas.style.backgroundColor = 'rgb(0, 0, 0)';
  ctx = canvas.getContext('2d'); // This is the context
  // Button position and dimensions
  buttonW = 120; //width
  buttonH = 40; //height
  //sets button to the middle of the canvas
  buttonX = canvas.width/2 + 175;
  buttonY = canvas.height/2 + 250;

  ctx.drawImage(splash, 0, 0, canvas.width, canvas.height); //load in splash screen
  //start text properties
  ctx.font = "45px myFirstFont";
  ctx.fillStyle = 'rgb(180, 180, 180)';
  ctx.fillText("Start", buttonX, buttonY + buttonH-3);

  //checks to see if the statr button is pressed
  canvas.addEventListener('click', function(event) {
    //checks postion of mouse relative to button
    if (event.offsetX > buttonX
      && event.offsetX < buttonX + buttonW
      && event.offsetY > buttonY
      && event.offsetY < buttonY + buttonH) {
        //if the game has not started
        if (typeof snake === 'undefined'){
          //resets everything and runs game
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          run();
        } //or if the snake dies
        else if(snake.gameOver === true) {
          //resets screen and refreshs page
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          location.reload(true);
        }
      }
    });
  }

  // runs game by calling snake and food functions
  function run(){
    snake = new Snake(new JSVector(20, 20), new JSVector(0, 1)); // creates snake with a loc vector and velocity vector (set to up)
    food = new Food(new JSVector(Math.floor(Math.random()*rows), Math.floor(Math.random()*cols))); //sets food location to random when loaded
    //the snake movement
    window.addEventListener('keypress', function(event){
      keyName = event.key;
      if (keyName === "w"){
        snake.vel = new JSVector(0, -1); //up
      } else if (keyName === "a"){
        snake.vel = new JSVector(-1, 0); // left
      } else if (keyName === "s"){
        snake.vel = new JSVector(0, 1); // down
      } else if (keyName === "d"){
        snake.vel = new JSVector(1, 0); // right
      }
    }, false);
    document.getElementById('score').innerHTML=score; // updates score
    animate(); // Calls animate function
  }

  function animate(){
    //loops animate function
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //calls render an update funcitons for food and snake
    food.render();
    snake.update();
    snake.render();
    snake.checkCollisions();
    //chcks to see if snake is dead
    if (snake.gameOver === true){
      // end screen and retry text now show
      ctx.drawImage(endGame, 0, 0, canvas.width, canvas.height);
      //retry text button properties
      ctx.font = "45px myFirstFont";
      ctx.fillStyle = 'rgb(180, 180, 180)';
      ctx.fillText("Retry", buttonX, buttonY + buttonH-3);
    }
    //sets distance variable to see if the snake east the food
    var distance = food.loc.distance(snake.segs[0][0]);
    //if this distance is 0 than the snake grows and score increases by 20
    if (distance === 0){
      food.move(); // moves food to another random location
      snake.grow(); // calls function for snake to grow
      score = score + 20; // increases score by 20
      document.getElementById('score').innerHTML=score; // updates score with its new value
    }
  }
