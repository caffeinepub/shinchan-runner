import { Html } from '@react-three/drei';

interface ScoreDisplayProps {
  score: number;
  visible: boolean;
}

export default function ScoreDisplay({ score, visible }: ScoreDisplayProps) {
  if (!visible) return null;

  return (
    <Html fullscreen>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-shinchan-red text-white px-8 py-3 rounded-full shadow-2xl border-4 border-shinchan-yellow">
          <div className="text-sm font-bold tracking-wider">SCORE</div>
          <div className="text-4xl font-black tracking-tight">{score}</div>
        </div>
      </div>
    </Html>
  );
}
