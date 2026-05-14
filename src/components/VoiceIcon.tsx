import React from 'react';

const VoiceIcon: React.FC = () => {
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
      {/* 底部横条 */}
      <svg
        className="absolute left-[21px] top-[35px] w-[15px] h-[4px]"
        viewBox="0 0 15 4" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="15" height="4" rx="2" fill="#111111" />
      </svg>
      {/* 声波点 */}
      <svg className="absolute left-[14px] top-[19px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[14px] top-[26px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[22px] top-[19px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[22px] top-[26px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[30px] top-[19px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[30px] top-[26px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[38px] top-[19px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
      <svg className="absolute left-[38px] top-[26px] w-1 h-1" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="2" cy="2" r="2" fill="#111111" />
      </svg>
    </div>
  );
};

export default VoiceIcon;