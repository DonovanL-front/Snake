window.addEventListener('load', () => {
    let canvas; 
    let ctx ; 
    let delay = 100;
    let xCoord = 0; 
    let yCoord = 0 ;
    
    init()

    function init() { 
      canvas = document.createElement('canvas')
      canvas.width = 900  ; 
      canvas.height = 600 ; 
      canvas.style.border = "1px solid";
      document.body.appendChild(canvas); 
      ctx = canvas.getContext('2d') ; 
      refreshCanvas(); 
    }
    // Animation du serpent avec refresh canvas qui s'execute toute les 10eme de secondes
    function refreshCanvas() { 
        xCoord += 15
        yCoord += 15
        ctx.clearRect(0, 0, canvas.width , canvas.height) 
        ctx.fillStyle = "#ff0000" ;
        ctx.fillRect(xCoord, yCoord, 100 , 50) ; 
        setTimeout(refreshCanvas, delay)
    }
})  