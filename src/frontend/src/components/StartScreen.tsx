import { Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Keyboard, Mouse } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <Html fullscreen>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-sky-300 to-green-200 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4 space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-8xl font-black text-shinchan-red drop-shadow-2xl animate-bounce">
              SHINCHAN
            </h1>
            <h2 className="text-5xl font-black text-shinchan-orange drop-shadow-lg">
              RUNNER
            </h2>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border-8 border-shinchan-yellow">
            <h3 className="text-3xl font-black text-shinchan-red mb-6">HOW TO PLAY</h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4 bg-shinchan-yellow/20 p-4 rounded-2xl">
                <div className="text-4xl">🍪</div>
                <div>
                  <p className="font-bold text-xl text-shinchan-orange">Collect Chocobi Chips</p>
                  <p className="text-gray-700">Earn 10 points for each chip!</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-red-100 p-4 rounded-2xl">
                <div className="text-4xl">⚠️</div>
                <div>
                  <p className="font-bold text-xl text-shinchan-red">Avoid Obstacles</p>
                  <p className="text-gray-700">Watch out for rocks and puddles!</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-blue-100 p-4 rounded-2xl">
                <div className="flex gap-2">
                  <Keyboard className="w-8 h-8 text-blue-600" />
                  <Mouse className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-xl text-blue-600">Controls</p>
                  <p className="text-gray-700">Press SPACE or CLICK to jump!</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="w-full max-w-md text-4xl font-black py-8 bg-shinchan-red hover:bg-shinchan-orange text-white transition-all duration-300 transform hover:scale-105 shadow-2xl rounded-3xl"
          >
            START GAME
          </Button>

          <footer className="text-sm text-gray-600 pt-4">
            Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-shinchan-red font-bold hover:underline"
            >
              caffeine.ai
            </a>
            {' '}© {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </Html>
  );
}
