import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  as?: 'button' | 'span';
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  onClick,
  className = '',
  as = 'button',
  disabled = false,
}) => {
  const baseClass =
    'flex items-center rounded-[100px] bg-[#F5F5F5] px-6 py-4 text-left h-[67px] outline-1 outline-white outline-offset-[-1px]';

  if (as === 'span') {
    return (
      <span className={`${baseClass} ${className}`}>
        <div className="mr-4 flex h-9 w-9 items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="whitespace-nowrap">{children}</span>
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} font-pingfang ${className}`}
    >
      <div className="mr-4 flex h-9 w-9 items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="whitespace-nowrap text-[24px] text-primary-text font-pingfang">
        {children}
      </span>
    </button>
  );
};

export default IconButton;