import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { sfx } from '../utils/audio';

interface ScrollTiltCardProps {
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  variants?: any;
}

export function ScrollTiltCard({ children, onMouseEnter, onMouseLeave, className, variants }: ScrollTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion values for x/y mouse coordinates relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  // Map coordinate offsets (from -0.5 to 0.5) to rotation degrees (tilt max 12deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  // Handle subtle lifted scale setting
  const scale = useSpring(1, { stiffness: 150, damping: 15 });

  // Combine springX, springY, and scale to compute a dynamic box-shadow based on hover and tilt!
  const boxShadow = useTransform(
    [springX, springY, scale],
    ([latestX, latestY, latestScale]) => {
      if (shouldReduceMotion) {
        return '0 15px 35px rgba(0, 0, 0, 0.45)';
      }

      const xVal = Number(latestX) || 0;
      const yVal = Number(latestY) || 0;
      const scaleVal = Number(latestScale) || 0;

      // Base dark card shadow
      const baseShadow = '0 15px 35px rgba(0, 0, 0, 0.45)';
      
      // If scale is near 1, we are not hovering, return flat/subtle glow
      if (scaleVal <= 1.01) {
        return `${baseShadow}, 0 0 1px rgba(255, 255, 255, 0.1)`;
      }

      // Calculate translation offset for shadow depending on tilt (opposite direction of the tilt tip)
      const shadowX = -xVal * 42; 
      const shadowY = -yVal * 42 + 20; // vertical downward offset for realistic lighting

      // Distance from center to increase shadow size/blur as the card tilts higher
      const tiltDistance = Math.sqrt(xVal * xVal + yVal * yVal); // max possible ~0.7
      
      const blur = 24 + tiltDistance * 45; // between 24px and 55px blur
      const spread = tiltDistance * 2;     // spread increases slightly to feel active
      const glowOpacity = 0.15 + tiltDistance * 0.22; // intensifies glow from 0.15 to 0.37 as you tilt more

      // Combined layered shadows: a solid dark shadow + a dynamic reactive red/orange glow
      return `${baseShadow}, ${shadowX}px ${shadowY}px ${blur}px ${spread}px rgba(239, 68, 68, ${glowOpacity})`;
    }
  );

  // Ghostly trail translation offsets (slight offset opposite to tilting to create high-fidelity parallax depth)
  const ghostX = useTransform(springX, (val) => -Number(val) * 28);
  const ghostY = useTransform(springY, (val) => -Number(val) * 28);

  // Ghostly trail opacity - activates beautifully when tilted & hovered
  const ghostOpacity = useTransform(
    [springX, springY, scale],
    ([latestX, latestY, latestScale]) => {
      if (shouldReduceMotion) return 0;
      const xVal = Number(latestX) || 0;
      const yVal = Number(latestY) || 0;
      const scaleVal = Number(latestScale) || 0;
      if (scaleVal <= 1.01) return 0;

      const tiltDistance = Math.sqrt(xVal * xVal + yVal * yVal);
      // Map tilt distance into graceful opacity
      return Math.min(0.15 + tiltDistance * 0.95, 0.75);
    }
  );

  // Dynamic light reflection radial sheen shifting with tilt angle
  const reflectionBg = useTransform(
    [springX, springY],
    ([latestX, latestY]) => {
      const xPercent = 50 + Number(latestX) * 120;
      const yPercent = 50 + Number(latestY) * 120;
      // Moving red & white light glares mimicking Japanese lacquer, steel, and parchment sheen
      return `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(239, 68, 68, 0.12) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 70%)`;
    }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates (-0.5 to 0.5 relative to center)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Custom non-linear progressive physical dampening factor
    // As the edge is approached, resistance increases non-linearly to simulate premium mechanical stiffness
    const progressiveDampening = (offset: number) => {
      const magnitude = Math.abs(offset);
      const resistanceFactor = 1 + magnitude * 3.2; // At boundaries magnitude can reach 0.5, adding substantial progressive resistance
      return offset / resistanceFactor;
    };

    const dampedX = progressiveDampening(relativeX);
    const dampedY = progressiveDampening(relativeY);

    x.set(dampedX);
    y.set(dampedY);
  };

  // Register dynamic coordinate listeners to compute pitch shifting whir intensity
  useEffect(() => {
    if (shouldReduceMotion) return;

    const computeAndSetWhir = () => {
      const xVal = springX.get();
      const yVal = springY.get();
      // Calculate active tilt intensity from coordinate bounds (radius of -0.5 to 0.5)
      const intensity = Math.min(1, Math.sqrt(xVal * xVal + yVal * yVal) * 2);
      sfx.updateWhir(intensity);
    };

    const unsubscribeX = springX.on('change', computeAndSetWhir);
    const unsubscribeY = springY.on('change', computeAndSetWhir);

    return () => {
      unsubscribeX();
      unsubscribeY();
      sfx.stopWhir();
    };
  }, [springX, springY, shouldReduceMotion]);

  const handleMouseEnter = () => {
    onMouseEnter?.();
    if (!shouldReduceMotion) {
      scale.set(1.05); // Feel like a lifted 3D scroll
      sfx.startWhir();
    }
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
    if (!shouldReduceMotion) {
      x.set(0);
      y.set(0);
      scale.set(1);
      sfx.stopWhir();
    }
  };

  const motionStyles = shouldReduceMotion
    ? {
        transformStyle: 'flat' as const,
        perspective: undefined,
      }
    : {
        rotateX,
        rotateY,
        scale,
        boxShadow,
        transformStyle: 'preserve-3d' as const,
        perspective: 1200,
      };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={motionStyles}
      className={className}
      id="scroll-tilt-card"
    >
      {/* Mystical ghostly scroll trail underlay that offsets and fades behind the card while tilted */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(0, 0, 0, 0.95))',
            borderWidth: '1.5px',
            borderStyle: 'solid',
            borderColor: 'rgba(239, 68, 68, 0.45)',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)',
            x: ghostX,
            y: ghostY,
            scale: 0.98,
            opacity: ghostOpacity,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-20px)',
            filter: 'blur(4px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
          className="absolute inset-0 rounded-3xl"
        />
      )}

      {/* Semi-transparent parchment grain texture and dynamic light reflection sheen */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"), ${reflectionBg}`,
            backgroundBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: useTransform(scale, [1, 1.05], [0.35, 1]), // Shines brighter as the card lifts
          }}
          className="absolute inset-0 rounded-3xl"
        />
      )}

      {/* Inner container with preserve-3d to push text elements out */}
      <div 
        style={shouldReduceMotion ? undefined : { transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }} 
        className="h-full w-full flex flex-col justify-between relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
}
