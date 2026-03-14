'use client';

import { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setExpanded(true);
      }
    };
    const handleOut = () => setExpanded(false);

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [handleMouseMove]);

  if (!visible) return null;

  return (
    <div
      className={`custom-cursor ${expanded ? 'expanded' : ''} hidden lg:block`}
      style={{
        left: pos.x - (expanded ? 20 : 6),
        top: pos.y - (expanded ? 20 : 6),
      }}
    />
  );
};

export default CustomCursor;
