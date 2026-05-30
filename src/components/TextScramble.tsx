/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  duration?: number;
  className?: string;
}

const CHARS = 'X01_ØΞΔΨΦΩ★▲▼◀▶█▓▒░';

export function TextScramble({ text, duration = 800, className = '' }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let active = true;
    let frame = 0;
    const totalFrames = Math.floor(duration / 16); // 16ms per frame ~ 60fps
    const startTimes = text.split('').map((_, i) => (i / text.length) * (totalFrames * 0.5));

    const interval = setInterval(() => {
      if (!active) return;

      const output = text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        
        const startTime = startTimes[index];
        const elapsed = frame - startTime;

        if (elapsed >= totalFrames * 0.5) {
          return char;
        }

        if (frame > startTime) {
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        return char;
      }).join('');

      setDisplayText(output);
      frame++;

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 16);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [text, duration]);

  return <span className={className}>{displayText}</span>;
}
