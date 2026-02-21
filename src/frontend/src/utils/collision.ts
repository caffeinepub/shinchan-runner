export function checkCollision(
  player: { x: number; y: number },
  target: { x: number; y: number },
  playerSize: number,
  targetSize: number
): boolean {
  const dx = player.x - target.x;
  const dy = player.y - target.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDistance = (playerSize + targetSize) / 2;
  
  return distance < minDistance;
}
