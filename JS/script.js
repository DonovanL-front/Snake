window.addEventListener('load', () => {
    let ctx ; 
    let delay = 100;
    let canvasWidth = 1200;
    let canvasHeight = 600; 
    let blockSize = 30;
    let snakee ; 
    
    class Snake { 
      constructor(body , direction){
        this.body = body
        this.direction = direction
        this.draw = () => {
            ctx.save(); 
            ctx.fillStyle = "#ff0000"
            for(let i = 0 ; i < this.body.length ; i++) { 
                drawBlock(ctx , this.body[i]); 
            } 
            ctx.restore ;        
        };
    }
    advance() {
        let nextPosition = this.body[0].slice() ; 
        switch(this.direction) { 
            case "left" : 
            nextPosition[0] -= 1 
            break;
            case "right" : 
            nextPosition[0] += 1
            break; 
            case "down" : 
            nextPosition[1] += 1
            break ; 
            case "up" : 
            nextPosition[1] -= 1
            break;
            default : 
            throw("Invalid direction")
        }
        this.body.unshift(nextPosition) ; 
        this.body.pop() ;  
    }; 
    setDirection(newDirection) { 
        let allowedDirections;
        switch(this.direction) { 
            case "left" : 
            case "right" : 
              allowedDirections = ["up", "down"]
            break; 
            case "down" : 
            case "up" : 
             allowedDirections = ["left" , "right"]
            break;
            default : 
            throw("Invalid direction")
    
        }
        if(allowedDirections.indexOf(newDirection) > -1) { 
            this.direction = newDirection;
        }
    };
}

    init()
    //Innitialise le canvas 
    function init() { 
      let canvas = document.createElement('canvas')
      canvas.width = canvasWidth  ; 
      canvas.height = canvasHeight; 
      canvas.style.border = "1px solid";
      document.body.appendChild(canvas); 
      ctx = canvas.getContext('2d') ; 
      snakee = new Snake([[6,4] , [5,4] , [4,4]] , "right");
      refreshCanvas(); 
    }



    // Animation du serpent avec refresh canvas qui s'execute toute les 10eme de secondes
    function refreshCanvas() { 
      ctx.clearRect(0, 0, canvasWidth, canvasHeight) 
      snakee.draw() ; 
      snakee.advance();
      setTimeout(refreshCanvas, delay)
    }

    function drawBlock(ctx , position) {
      let x = position[0] * blockSize;
      let y = position[1] * blockSize; 
      ctx.fillRect(x, y, blockSize, blockSize)
    }


    
    document.addEventListener('keydown' , function handleKeyDown(e) { 
        let key = e.key;
        let newDirection ;
        switch(key) { 
            case "ArrowLeft" :
                newDirection = "left"
            break; 
            case "ArrowUp" : 
                newDirection = "up"
            break; 
            case "ArrowRight" : 
                newDirection = "right"
            break; 
            case "ArrowDown" :
                newDirection = "down"
            break; 
            default : 
            return;
        }
        snakee.setDirection(newDirection)

    }) 
        
})  