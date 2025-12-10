import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Cursor = () => {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a link or button
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('link') ||
        target.classList.contains('cursor-pointer')
      ) {
        setLinkHover(true);
      } else {
        setLinkHover(false);
      }
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const cursorColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0";

  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     return null; // Don't render custom cursor on mobile
  }

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-opacity duration-300 left-0 top-0"
      style={{
        opacity: hidden ? 0 : 1,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={`relative -top-3 -left-3 rounded-full border border-gray-500 transition-all duration-150 ease-out`}
        style={{
            width: linkHover ? '40px' : '24px',
            height: linkHover ? '40px' : '24px',
            backgroundColor: `rgba(${cursorColor}, ${linkHover ? 0.1 : 0})`,
            borderColor: `rgba(${cursorColor}, ${linkHover ? 0 : 0.5})`,
            transform: `translate(${linkHover ? '-8px' : '0px'}, ${linkHover ? '-8px' : '0px'})`
        }}
      />
      <div 
        className="absolute top-0 left-0 rounded-full bg-current transition-all duration-100 ease-out"
        style={{
            width: clicked ? '6px' : '8px',
            height: clicked ? '6px' : '8px',
            backgroundColor: `rgba(${cursorColor}, 1)`,
            top: '8px',
            left: '8px'
        }}
      />
    </div>
  );
};

export default Cursor;
