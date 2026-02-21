import { Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export default function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <Html fullscreen>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-gradient-to-br from-shinchan-yellow via-shinchan-orange to-shinchan-red p-8 rounded-3xl shadow-2xl border-8 border-white max-w-md w-full mx-4 transform animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-black text-white drop-shadow-lg animate-bounce">
              GAME OVER!
            </h1>
            
            <div className="bg-white rounded-2xl p-6 shadow-inner">
              <p className="text-2xl font-bold text-shinchan-red mb-2">Final Score</p>
              <p className="text-6xl font-black text-shinchan-orange">{score}</p>
            </div>

            <div className="space-y-3">
              <p className="text-xl font-bold text-white drop-shadow">
                {score >= 100 ? "🎉 Amazing! Shinchan is proud!" : 
                 score >= 50 ? "😊 Great job! Keep going!" : 
                 "💪 Try again! You can do it!"}
              </p>
              
              <Button
                onClick={onRestart}
                size="lg"
                className="w-full text-2xl font-black py-6 bg-white text-shinchan-red hover:bg-shinchan-yellow hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl rounded-2xl"
              >
                PLAY AGAIN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
