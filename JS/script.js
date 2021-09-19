window.addEventListener("load", () => {
  let ctx;
  let delay = 100;
  let canvasWidth = 1200;
  let canvasHeight = 600;
  let blockSize = 30;
  let snakee;
  let applee;
  let widthInBlocks = canvasWidth / blockSize;
  let heightInBlocks = canvasHeight / blockSize;
  let score ;


//   Objet snake 
  class Snake {
    constructor(body, direction) {
      this.body = body;
      this.direction = direction;
      this.ateApple = false ; 
    //   Dessine le serpent 
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
          throw "Invalid direction";
      }
      this.body.unshift(nextPosition);
    //   Si le serpent mange une pomme la variable ateApple passe a  true et éxécute this.body.pop() dans le cas contraire notre serpent ne grandit pas  
      if (!this.ateApple){
          this.body.pop();
      } else { 
          this.ateApple = false
      }
    }
    setDirection(newDirection) {
      let allowedDirections;
      switch (this.direction) {
        case "left":
        case "right":
          allowedDirections = ["up", "down"];
          break;
        case "down":
        case "up":
          allowedDirections = ["left", "right"];
          break;
        default:
          throw "Invalid direction";
      }
      if (allowedDirections.indexOf(newDirection) > -1) {
        this.direction = newDirection;
      }
    }
    checkCollision() {
      let wallCollision = false;
      let snakeCollision = false;
      let head = this.body[0];
      let rest = this.body.slice(1);
      let snakeX = head[0];
      let snakeY = head[1];
      let minX = 0;
      let minY = 0;
      let maxX = widthInBlocks - 1;
      let maxY = heightInBlocks - 1;
      let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
      let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
      if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
        wallCollision = true;
      }

      for (let i = 0; i < rest.length; i++) {
        if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
          snakeCollision = true;
        }
      }
      return wallCollision || snakeCollision;
    }; 
    isEatingApple(appleToEat) {
        let head = this.body[0]
        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]){
            return true;  
        } else {
            return false
        }
    }
};

// Objet apple
  class Apple {
    constructor(position) {
      this.position = position;
    }
    draw() {
      ctx.save();
      ctx.fillStyle = "#33cc33";
      ctx.beginPath();
      let radius = blockSize / 2;
      let x = this.position[0] * blockSize + radius;
      let y = this.position[1] * blockSize + radius;
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    }
    setNewPosition() { 
        let newX = Math.round(Math.random() * (widthInBlocks - 1))
        let newY = Math.round(Math.random() * (heightInBlocks - 1))
        this.position = [newX , newY]
    }

    // Si  la pomme réaparait sur le serpent cette méthode sera éxécutée pour reinitialiser la nouvelle position de la pomme 
    isOnSnake(snakeToCheck) { 
        let isOnSnake = false ; 
        for(let i = 0 ; i < snakeToCheck.body.length ; i++ ) { 
            if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]) {
                isOnSnake = true ;
            }
        }
    }
  }



//   Fonctions de jeu 

  init();
  //Innitialise le canvas
  function init() {
    let canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid";
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
    applee = new Apple([10, 10]);
    score = 0 ;
    refreshCanvas();
  }

  // Animation du serpent avec refresh canvas qui s'execute toute les 10eme de secondes
  function refreshCanvas() {
    snakee.advance();
    if (snakee.checkCollision()) {
      //Game over
        gameOver();
    } else {
        if (snakee.isEatingApple(applee)) { 
            score++;
            snakee.ateApple = true
            do { 
                // Le serpent a mangé la pomme
                applee.setNewPosition();                
            }
            while(applee.isOnSnake(snakee))
        }
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      applee.draw();
      snakee.draw();
      drawScore();
      setTimeout(refreshCanvas, delay);
    }
  }

  function gameOver() { 
      ctx.save();
      ctx.fillText("Game Over" , 5 , 15) ;
      ctx.fillText("Appuyez sur la touche escape pour rejouer" , 5 , 30 )
      ctx.restore(); 
  }

  function drawScore() { 
    ctx.save();
      ctx.fillText(score.toString() , 5 , canvasHeight -5) ;
      ctx.restore(); 
  }

  function restart() { 
    snakee = new Snake(
        [
          [6, 4],
          [5, 4],
          [4, 4],
        ],
        "right"
      );
      applee = new Apple([10, 10]);
      score = 0 ;
      refreshCanvas(); 
  }

  function drawBlock(ctx, position) {
    let x = position[0] * blockSize;
    let y = position[1] * blockSize;
    ctx.fillRect(x, y, blockSize, blockSize);
  }
// Récupère les frappes des fleches du clavier 
  document.addEventListener("keydown", function handleKeyDown(e) {
    let key = e.key;
    let newDirection;
    switch (key) {
      case "ArrowLeft":
        newDirection = "left";
        break;
      case "ArrowUp":
        newDirection = "up";
        break;
      case "ArrowRight":
        newDirection = "right";
        break;
      case "ArrowDown":
        newDirection = "down";
        break;
      case "Escape" : 
      restart();
      return;
      default:
        return;
    }
    snakee.setDirection(newDirection);
  });
});