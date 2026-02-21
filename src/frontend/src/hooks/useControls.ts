import { useState, useEffect } from 'react';

export function useControls(enabled: boolean) {
  const [controls, setControls] = useState({
    jump: false,
    moveUp: false,
    moveDown: false,
  });

  useEffect(() => {
    if (!enabled) {
      setControls({ jump: false, moveUp: false, moveDown: false });
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        setControls((prev) => ({ ...prev, jump: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        setControls((prev) => ({ ...prev, jump: false }));
      }
    };

    const handleClick = () => {
      setControls((prev) => ({ ...prev, jump: true }));
      setTimeout(() => {
        setControls((prev) => ({ ...prev, jump: false }));
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleClick);
    };
  }, [enabled]);

  return controls;
}
