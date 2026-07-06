import React from 'react';

export default function EmergencyFab({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-gutter right-gutter md:hidden w-14 h-14 bg-error text-white rounded-full shadow-2xl flex items-center justify-center z-50 active:scale-90 transition-transform cursor-pointer hover:bg-error/90"
      aria-label="Emergency Assistance"
    >
      <span 
        className="material-symbols-outlined text-[30px]" 
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        emergency_home
      </span>
    </button>
  );
}
