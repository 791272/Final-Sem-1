//creates all the variables of the snake object
function Snake(loc, vel){
  this.gameOver; // used to check if snake is dead
  this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255)  +  ')'; // sets c to random color
  this.segs = []; // segmen
  this.vel = vel; // creates velocity variable
  this.count = 0; // used to update snake at less than every frame
  this.loc = loc; // create location variable
  this.segsStart = 3; // snake begins with 3 segments
  //
  for (var i = 0; i < 1; i++){
    this.segs[i] = new Array(2);
    this.segs[i][0] = this.loc
    this.segs[i][1] = new JSVector(0, 0);
  }
  for (var i = 1; i < this.segsStart; i++){
    this.segs[i] = new Array(2);
    this.segs[i][0] = JSVector.subGetNew(this.segs[i-1][0], this.vel);
    this.segs[i][1] = new JSVector(0, 0);
  }
}

Snake.prototype.update = function(){
  //count used to slow down snake movement
  this.count++;
  if (this.count === 5){ //updates every 5 frames

    this.segs[0][1] = this.segs[0][0];
    this.segs[0][0] = JSVector.addGetNew(this.segs[0][0], this.vel);
    for (var i = 1; i < this.segs.length; i++){
      this.segs[i][1] = this.segs[i][0];
      this.segs[i][0] = this.segs[i-1][1];
    }
    this.count = 0;
  }
}

Snake.prototype.render = function(){
  for (var i = 0; i < this.segs.length; i++){
    ctx.beginPath();
    ctx.rect(this.segs[i][0].x*w, this.segs[i][0].y*w, w, w);
    ctx.strokeStyle = 'rgb(200, 200, 200)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

Snake.prototype.checkCollisions = function(){
  for (var i = 0; i < this.segs.length; i++){
    for (var j = 0; j < i; j++){
      if (this.segs[i][0].distance(this.segs[j][0]) === 0
      || this.segs[0][0].x > cols-1
      || this.segs[0][0].y > rows-1
      || this.segs[0][0].x < 0
      || this.segs[0][0].y < 0){
        this.gameOver = true;
      }
    }
  }
}

Snake.prototype.grow = function(){
  this.segs.push(new Array(2));
  this.segs[this.segs.length-1][0] = this.segs[this.segs.length-2][1];
  this.segs[this.segs.length-1][1] = new JSVector(0, 0);
}
