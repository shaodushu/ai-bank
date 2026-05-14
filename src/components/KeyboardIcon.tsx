import React from 'react';

const KeyboardIcon: React.FC = () => {
  return (
    <div className="relative w-[56px] h-[56px]">
      {/* 外圈 */}
      <svg
        className="absolute left-[4.67px] top-[4.67px] w-[51px] h-[51px]"
        viewBox="0 0 51 51" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="46.6667" height="46.6667" rx="23.3333" stroke="#111111" strokeWidth="4" strokeLinejoin="round" />
      </svg>
      {/* 中心圆点 */}
      <svg
        className="absolute left-[18.67px] top-[25.67px] w-[5px] h-[5px]"
        viewBox="0 0 5 5" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="2.33333" cy="2.33333" r="2.33333" fill="#111111" />
      </svg>
      {/* 内弧 */}
      <svg
        className="absolute left-[25.67px] top-[21px] w-[8px] h-[18px]"
        viewBox="0 0 8 18" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 16C6.66667 12.134 6.66667 5.86601 2 2" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* 外弧 */}
      <svg
        className="absolute left-[31.50px] top-[15.17px] w-[10px] h-[30px]"
        viewBox="0 0 10 30" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.00004 27.6667C9.77782 20.579 9.77782 9.08767 2.00004 2" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default KeyboardIcon;