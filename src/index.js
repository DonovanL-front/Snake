import Game from "./game.js";
window.addEventListener("load", () => {
  let myGame = new Game();
  // let myGame2 =  new Game();

  myGame.init(); 
  
  // myGame2.init(); 
  
  document.addEventListener("keydown", (e) => {
    const key = e.key;
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
      case "Escape":
        myGame.launch();
        // myGame2.launch()
      default:
        return;
    }
    myGame.snakee.setDirection(newDirection);
    // myGame2.snakee.setDirection(newDirection);
  }); 
});

