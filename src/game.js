import Snake from './snake.js'; 
import Apple from './apple.js'; 
import Drawing from './draw.js' ; 
export default class Game { 
    constructor(canvasWidth = 1200, canvasHeight = 900) {
      this.delay = 50;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.blockSize = 30;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.widthInBlocks = this.canvasWidth / this.blockSize
      this.heightInBlocks = this.canvasHeight / this.blockSize
      this.canvas;
      this.ctx;
      this.snakee;
      this.applee;
      this.score ; 
      this.centreX = this.canvasWidth/2; 
      this.centreY = this.canvasHeight/2;
      this.timeOut;
    }
    
    
    init() {
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      this.canvas.style.backgroundColor = "lightGray"
      this.canvas.style.border = "30px solid lightSkyBlue";
      this.canvas.style.margin = "50px auto";
      this.canvas.style.display = "block"
      document.body.appendChild(this.canvas);
      this.launch();
    }
    
    launch(){
      this.snakee = new Snake(
        "right",
        [6, 4],
        [5, 4],
        [4, 4],
        );
      this.applee = new Apple([10 , 10])
      this.score = 0;
      this.delay = 100; 
      clearTimeout(this.timeOut)
      this.refreshCanvas();
      }
    
    speedUp() { 
      return this.delay /= 2
    }
    
    
  
    refreshCanvas() {
      this.snakee.advance();
      if(this.snakee.checkCollisions(this.widthInBlocks, this.heightInBlocks)){
        //Game over
        Drawing.gameOver(this.ctx, this.centreX, this.centreY);
      } else { 
        if (this.snakee.isEatingApple(this.applee)) {
          this.score++;
          this.snakee.ateApple = true
          if(this.score % 5 === 0 ) { 
            this.speedUp()
          }
          do {
            this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);
          }
          while(this.applee.isOnSnake(this.snakee))
        }
        
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score);
        Drawing.drawApple(this.ctx , this.blockSize, this.applee);
        Drawing.drawSnake(this.ctx, this.blockSize , this.snakee);
        this.timeOut = setTimeout(this.refreshCanvas.bind(this), this.delay);
      }
    }

  
}
