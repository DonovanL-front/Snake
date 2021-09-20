export default class Drawing {
  static gameOver(ctx, centerX, centerY) {
    ctx.save();
    ctx.font = "bold 85px sans-serif";
    ctx.fillStyle = "Gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeText("Game Over ", centerX, centerY - 180);
    ctx.fillText("Game Over ", centerX, centerY - 180);
    ctx.font = "bold 85px sans-serif";
    ctx.strokeText("Press escape to replay", centerX , centerY - 110);
    ctx.restore();
  }
  static drawBlock(ctx, position , blockSize) {
    const [x, y] = position;
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  }
  static drawScore(ctx, centerX, centerY, score) {
    ctx.save();
    ctx.font = "bold 100px sans-serif";

    ctx.fillStyle = "Gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"
    ctx.fillText(score.toString(), centerX, centerY);
    ctx.restore();
  }
  static drawSnake(ctx, blockSize, snake) {
    ctx.save();
    ctx.fillStyle = "#ff0000";
    for (let block of snake.body) {
      this.drawBlock(ctx, block, blockSize);
    }
    ctx.restore;
  }
  static drawApple(ctx, blockSize, apple) {
    const radius = blockSize / 2;
    const x = apple.position[0] * blockSize + radius;
    const y = apple.position[1] * blockSize + radius;
    ctx.save();
    ctx.fillStyle = "#33cc33";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();
  }
}