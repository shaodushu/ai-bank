'use client';

import React, { useEffect, useCallback, useState } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'center' | 'bottom';
  className?: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  position = 'center',
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  // ESC 键关闭
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // 下一帧触发入场动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted) return null;

  const isBottom = position === 'bottom';

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
        animating ? 'opacity-100' : 'opacity-0'
      } ${isBottom ? 'items-end' : 'items-center justify-center'}`}
    >
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 内容区域 */}
      <div
        className={`relative w-full max-w-[750px] mx-auto flex flex-col min-h-0 transition-transform duration-300 ${
          isBottom
            ? animating
              ? 'translate-y-0'
              : 'translate-y-full'
            : animating
              ? 'scale-100'
              : 'scale-95'
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;