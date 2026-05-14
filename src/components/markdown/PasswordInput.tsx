'use client';

import React from 'react';
import XmdCard from './XmdCard';

interface PasswordInputProps {
  streamStatus?: 'loading' | 'done';
}

const PasswordInput: React.FC<PasswordInputProps> = ({ streamStatus }) => {
  if (streamStatus === 'loading') {
    return (
      <div className="mx-0 mb-6 bg-[#F5F5F5] p-6 rounded-[24px] animate-pulse">
        <div className="mb-4 h-[28px] w-[300px] bg-gray-200 rounded" />
        <div className="mb-4 h-[1px] bg-[#E6E6E6]" />
        <div className="mb-4 flex gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-20 w-20 bg-gray-200 rounded-[8px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <XmdCard className="mx-0 mb-6 bg-[#F5F5F5] p-6 rounded-[24px]">
      {/* 标题 */}
      <p
        className="mb-4 text-[28px] font-normal text-primary-text font-pingfang"
      >
        好的，需要验证您的支付密码
      </p>

      {/* 分隔线 */}
      <div className="mb-4 h-[1px] bg-[#E6E6E6]" />

      {/* 6个密码输入框 */}
      <div className="mb-4 flex gap-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="flex h-20 w-20 items-center justify-center bg-white rounded-[8px]"
          />
        ))}
      </div>

      {/* 忘记密码链接 */}
      <div className="flex justify-center">
        <button
          className="text-[28px] font-medium text-primary-blue font-roboto"
        >
          忘记密码
        </button>
      </div>
    </XmdCard>
  );
};

export default PasswordInput;