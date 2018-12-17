function Food(loc){
  //set color and location of the food
  this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255)  +  ')';
  this.loc = loc;
}

Food.prototype.render = function(){
  //draw food
  ctx.beginPath();
  ctx.rect(this.loc.x*w, this.loc.y*w, w, w)
  //color of the border
  ctx.strokeStyle = 'rgb(193, 50, 50)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

Food.prototype.move = function(){
  //makes new rndom vecot when called
  this.loc = new JSVector(Math.floor(Math.random()*rows), Math.floor(Math.random()*cols));
  //prevents the food from overlapping with the snake by traversing the snake segments and checking is the loc is the same
  for (var i = 0; i < snake.segs.length; i++){
    if (this.loc === snake.segs[i][0]){
      move();
    }
  }
}
