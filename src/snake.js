export default class Snake {
    constructor(direction , ...body) {
      this.direction = direction;
      this.body = body;
      this.ateApple = false ;
     
      
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
    checkCollisions(widthInBlocks, heightInBlocks) { 
        let snakeCollision = false;
        let wallCollision = false;
        let [head, ...rest] = this.body
        // let head = this.body[0]
        // let rest = this.body.slice(1) 
        let [snakeX, snakeY] = head
        // let snakeX = head[0]
        // let snakeY = head[1];
        let minX = 0; 
        let minY = 0 ;
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