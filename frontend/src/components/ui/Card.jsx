import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  isGlass = true, 
  elevation = 'l1', 
  hoverable = true 
}) {
  const baseStyle = isGlass 
    ? 'glass-panel' 
    : 'bg-surface-container-lowest border border-outline-variant/30';
  
  const shadowStyle = elevation === 'l2' ? 'elevation-l2' : 'elevation-l1';
  const hoverStyle = hoverable ? 'transition-transform-hover transition-all duration-300' : '';

  return (
    <div className={`w-full rounded-xl ${baseStyle} ${shadowStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
}
