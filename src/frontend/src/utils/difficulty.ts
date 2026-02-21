export function calculateSpeed(score: number): number {
  const BASE_SPEED = 1;
  const SPEED_INCREMENT = 0.1;
  const MAX_SPEED = 3;
  
  const speedIncrease = Math.floor(score / 50) * SPEED_INCREMENT;
  const newSpeed = BASE_SPEED + speedIncrease;
  
  return Math.min(newSpeed, MAX_SPEED);
}
