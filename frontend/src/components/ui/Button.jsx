import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  icon,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const isPrimary = variant === 'primary';
  const isSocial = variant === 'social';

  const baseStyles = "w-full py-md font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:pointer-events-none group cursor-pointer";

  const variantStyles = isPrimary
    ? "bg-primary text-on-primary shadow-sm hover:bg-primary-container hover:shadow-md"
    : isSocial
    ? "bg-white border border-outline-variant text-on-surface hover:bg-surface-container-low"
    : "border border-outline-variant text-on-surface hover:bg-surface-container-low";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="material-symbols-outlined animate-spin text-[20px]">
            progress_activity
          </span>
          Processing...
        </>
      ) : (
        <>
          {children}
          {icon && (
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform select-none">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
