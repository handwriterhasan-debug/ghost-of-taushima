import { motion, useAnimation } from 'motion/react';
import { useState, useEffect } from 'react';

interface MotionSwordsProps {
  className?: string;
  isAnimateBounce?: boolean;
}

export function MotionSwords({ className = "w-5 h-5", isAnimateBounce = false }: MotionSwordsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const bladeControls = useAnimation();
  const trailControls = useAnimation();

  // Handle hover animations
  useEffect(() => {
    if (isHovered) {
      bladeControls.start({
        pathLength: [0, 1],
        transition: { duration: 0.6, ease: 'easeOut' },
      });
      trailControls.start({
        pathLength: [0, 1],
        opacity: [0, 1, 0],
        transition: { duration: 0.8, ease: 'easeInOut', delay: 0.15 },
      });
    } else {
      bladeControls.start({ pathLength: 1 });
      trailControls.start({ pathLength: 1, opacity: 0 });
    }
  }, [isHovered, bladeControls, trailControls]);

  // Handle click flash/slash trail trigger
  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    bladeControls.start({
      scale: [1, 1.25, 1],
      rotate: [0, -15, 15, 0],
      transition: { duration: 0.4, ease: 'easeInOut' },
    });
    trailControls.start({
      pathLength: [0, 1],
      opacity: [1, 0.8, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative cursor-pointer select-none inline-flex items-center justify-center ${className} ${
        isAnimateBounce ? 'animate-bounce' : ''
      }`}
      style={{ perspective: 800 }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2005/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-current"
        animate={bladeControls}
      >
        {/* === FIRST SWORD (Top-Left to Bottom-Right) === */}
        {/* Main Blade */}
        <motion.path
          d="M 4 4 L 17 17"
          animate={bladeControls}
          initial={{ pathLength: 1 }}
        />
        {/* Hilt & Guard */}
        <path d="M 17 17 L 20 20" strokeWidth="2.5" />
        <path d="M 15.5 18.5 L 18.5 15.5" strokeWidth="2" />

        {/* Trail Effect Underlay for First Sword */}
        <motion.path
          d="M 4 4 L 17 17"
          stroke="#ef4444"
          strokeWidth="3.5"
          className="blur-[2px] pointer-events-none mix-blend-screen"
          animate={trailControls}
          initial={{ pathLength: 0, opacity: 0 }}
        />

        {/* === SECOND SWORD (Top-Right to Bottom-Left) === */}
        {/* Main Blade */}
        <motion.path
          d="M 20 4 L 7 17"
          animate={bladeControls}
          initial={{ pathLength: 1 }}
        />
        {/* Hilt & Guard */}
        <path d="M 7 17 L 4 20" strokeWidth="2.5" />
        <path d="M 8.5 18.5 L 5.5 15.5" strokeWidth="2" />

        {/* Trail Effect Underlay for Second Sword */}
        <motion.path
          d="M 20 4 L 7 17"
          stroke="#ef4444"
          strokeWidth="3.5"
          className="blur-[2px] pointer-events-none mix-blend-screen"
          animate={trailControls}
          initial={{ pathLength: 0, opacity: 0 }}
        />

        {/* Intersecting Spark particles appearing on click */}
        {clickCount > 0 && (
          <motion.circle
            key={`click-spark-${clickCount}`}
            cx="12"
            cy="12"
            r="3"
            stroke="#ffffff"
            strokeWidth="1"
            fill="#ef4444"
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-none"
          />
        )}
      </motion.svg>
    </div>
  );
}
