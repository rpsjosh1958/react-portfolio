import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomLoader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire loader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    // Initial state
    gsap.set(logoRef.current, { opacity: 0 });

    // Animation sequence - fade in, hold, then loop fade in/out 3 times
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    })
    .to(logoRef.current, {
      opacity: 0.3,
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 3, // Will fade in/out 3 times (repeat counts the yoyo)
    })
    .to(logoRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to({}, { duration: 1 }); // Final pause before container fade out

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black transition-colors duration-300"
    >
      {/* Logo container */}
      <div className="relative flex flex-col items-center">
        <div ref={logoRef}>
          {/* SVG Logo */}
          <img
            src="/images/LOADERLOGO.svg"
            alt="RPS ART Logo"
            className="w-64 h-auto dark:invert dark:brightness-0 dark:contrast-200"
          />
        </div>
      </div>
    </div>
  );
}
