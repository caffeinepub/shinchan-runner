import { Canvas } from '@react-three/fiber';
import Game from './components/Game';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-green-100 overflow-hidden">
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 0, 100] }}
        className="w-full h-full"
      >
        <Game />
      </Canvas>
      <Toaster />
    </div>
  );
}

export default App;
