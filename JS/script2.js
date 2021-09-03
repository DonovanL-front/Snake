window.addEventListener("load", () => {
    let delay = 100;
    let canvasWidth = 1200;
    let canvasHeight = 600;
    let blockSize = 30;
    let radius = blockSize/2; 
    let widthInBlocks = canvasWidth / blockSize
    let heightInBlocks = canvasHeight / blockSize
    let canvas;
    let ctx;
    let snakee;
    let applee;
    let score ; 

  

  class Snake {
    constructor(body, direction) {
      this.body = body;
      this.direction = direction;
      this.ateApple = false ;
      this.draw = () => {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for (let i = 0; i < this.body.length; i++) {
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore;
      };
    }
    advance() {
      let nextPosition = this.body[0].slice();
      switch (this.direction) {
        case "left":
          nextPosition[0] -= 1;
          break;
        case "right":
          nextPosition[0] += 1;
          break;
        case "down":
          nextPosition[1] += 1;
          break;
        case "up":
          nextPosition[1] -= 1;
          break;
        default:
          throw "Invalid direction ";
      }
      this.body.unshift(nextPosition);
      if(!this.ateApple){
        this.body.pop();
      }
      else {
         this.ateApple = false
      }
    }
    setDirection(newDirection) {
        let allowedDirections;
        switch(this.direction) {
            case "left":
            case "right":
                allowedDirections = ["up" , "down"]
                break;
            case "down":
            case "up":
                allowedDirections = ["left" , "right"];
                break;
            default:
                throw "Invalid direction ";
        }
        if(allowedDirections.indexOf(newDirection) > -1) {
            this.direction = newDirection
        }
    }
    checkCollisions() { 
        let snakeCollision = false;
        let wallCollision = false;
        let head = this.body[0]
        let rest = this.body.slice(1)  
        let snakeX = head[0]
        let snakeY = head[1];
        let minX = 0
        let minY = 0
        let maxX = widthInBlocks -1
        let maxY = heightInBlocks -1
        let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX
        let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY 
        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
            wallCollision = true ; 
        } 
        for (let i = 0 ; i < rest.length ; i++) {
            if(snakeX == rest[i][0] && snakeY == rest[i][1]) {
                snakeCollision = true;
            }
        }
        return wallCollision || snakeCollision
    }
    isEatingApple(appleToEat) {
      let head = this.body[0]
      if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]){
        return true ; 
      } else {
        return false
      }
    }
  }

  class Apple { 
      constructor(position){
          this.position = position
      }
      draw() {
          ctx.save();
          ctx.fillStyle = "#33cc33";
          ctx.beginPath();
          let x = this.position[0] * blockSize + radius
          let y = this.position[1] * blockSize + radius
          ctx.arc(x, y, radius, 0 , Math.PI*2, true);
          ctx.fill()
          ctx.restore(); 
      }
      setNewPosition(){
        let newX = Math.round(Math.random() * (widthInBlocks -1))
        let newY = Math.round(Math.random() * (heightInBlocks -1))
        this.position = [newX, newY]
      }
      isOnSnake(snakeToCheck) {
        let isOnSnake = false
        for (let i = 0 ; i < snakeToCheck.body.length; i++){
          if(this.position[0] === snakeToCheck.body[i][0] || this.position[1] === snakeToCheck.body[i][1]) {
            isOnSnake = true;
          }
        }
      }
  }
  init();
  function init() {
    canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "30px solid lightGray";
    canvas.style.margin = "50px auto";
    canvas.style.display = "block"
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    snakee = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
      ],
      "right"
      );
      applee = new Apple([10 , 10]);
      score = 0;
      refreshCanvas();
  }

  function restart(){
    score = 0;
    snakee = new Snake(
      [
        [6, 4],
        [5, 4],
        [4, 4],
      ],
      "right"
    );
    applee = new Apple([10 , 10])
    refreshCanvas();
  }

  function drawBlock(ctx, position) {
    let x = position[0] * blockSize;
    let y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }

  function drawScore(){
    ctx.save();
    ctx.fillText(score.toString() , 5 , canvasHeight - 5)
    ctx.restore();
  }
  
  function gameOver() {
    ctx.save()
    ctx.fillText("Game Over " , 5 , 15)
    ctx.fillText("Press escape to replay" , 5 , 30)
    ctx.restore()
  }

  function refreshCanvas() {
    snakee.advance();
    drawScore();
      if(snakee.checkCollisions()){
          //Game over
          gameOver();
        } else { 
          if (snakee.isEatingApple(applee)) {
            score++;
            snakee.ateApple = true
            do {
              applee.setNewPosition();
            }
            while(applee.isOnSnake(snakee))
          }
          
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          applee.draw();
          snakee.draw();
          setTimeout(refreshCanvas, delay);
    }
  }


  document.addEventListener('keydown' , (e) =>  { 
    let key = e.key
    let newDirection ;
    switch(key) { 
        case "ArrowLeft":
            newDirection = "left" ;
            break;
        case "ArrowUp" : 
             newDirection = "up" ;
            break;
        case "ArrowRight":
            newDirection = "right" ;
            break;
        case "ArrowDown" : 
            newDirection = "down" ;
            break;
        case "Escape" : 
            restart();
        default:
            return;
    }
    snakee.setDirection(newDirection)

  })
});
