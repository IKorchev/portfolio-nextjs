'use client';

import { motion, useReducedMotion, useSpring } from 'motion/react';

/** Tilts toward the mouse cursor in 3D. Touch input and reduced motion leave it flat. */
export function Tilt({ children, className, max = 4 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * max * 2);
    rotateX.set(-y * max * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // Perspective lives on a wrapper so the card has no transform at rest, which keeps its text crisp
  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        className='h-full'
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}>
        {children}
      </motion.div>
    </div>
  );
}
