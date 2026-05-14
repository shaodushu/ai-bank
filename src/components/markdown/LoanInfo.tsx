'use client';

import React from 'react';
import { useMetadata } from './MetadataContext';
import XmdCard from './XmdCard';

export interface LoanTag {
  name: string;
  tagColor: string;
  tagBgColor: string;
}

export interface LoanItem {
  id: string;
  dueDate: string;
  amount: string;
  loanCount: number;
  tags: LoanTag[];
}

interface LoanInfoProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  _metadata?: Record<string, any>;
}

// 兜底 Mock 数据
const FALLBACK_MOCK: LoanItem[] = [
  {
    id: 'loan_001',
    dueDate: '9月14日',
    amount: '6031.09',
    loanCount: 2,
    tags: [],
  },
  {
    id: 'loan_002',
    dueDate: '9月17日',
    amount: '6031.09',
    loanCount: 2,
    tags: [{ name: '农户专享贷', tagColor: '#BD8A00', tagBgColor: 'rgba(189,138,0,0.10)' }],
  },
  {
    id: 'loan_003',
    dueDate: '9月22日',
    amount: '6031.09',
    loanCount: 2,
    tags: [
      { name: '农户专享贷', tagColor: '#BD8A00', tagBgColor: 'rgba(189,138,0,0.10)' },
      { name: '担保抵押贷', tagColor: '#BD8A00', tagBgColor: 'rgba(189,138,0,0.10)' },
    ],
  },
];

const RepaymentItem: React.FC<{ item: LoanItem }> = ({ item }) => {
  return (
    <div className="bg-[#F8F8F8] rounded-[8px] px-[24px] py-[16px]">
      {/* 标题行：日期 + 标签 */}
      <div className="flex items-center gap-[8px] overflow-hidden">
        <span
          className="text-[24px] whitespace-nowrap text-black-text font-pingfang"
        >
          {item.dueDate}待还&nbsp;(元)
        </span>
        {item.tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center h-[39px] px-[8px] rounded-[4px] flex-shrink-0"
            style={{ background: tag.tagBgColor }}
          >
            <span
              className="text-[22px] whitespace-nowrap font-pingfang"
              style={{ color: tag.tagColor }}
            >
              {tag.name}
            </span>
          </div>
        ))}
      </div>

      {/* 金额 */}
      <div className="mt-[8px]">
        <span
          className="text-[40px] text-black-text font-xwfont font-medium"
        >
          {item.amount}
        </span>
      </div>

      {/* 借款笔数 */}
      <div className="mt-[6px]">
        <span
          className="text-[24px] text-medium-gray font-pingfang"
        >
          共{item.loanCount}笔借款
        </span>
      </div>
    </div>
  );
};

const LoanInfo: React.FC<LoanInfoProps> = ({ streamStatus, 'data-key': dataKey, _metadata }) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const items: LoanItem[] = dataKey ? ((metadata[dataKey] as LoanItem[]) || []) : FALLBACK_MOCK;

  if (streamStatus === 'loading' && !items.length) {
    return (
      <div className="flex gap-[24px] py-4">
        <div className="w-[646px] h-[596px] bg-gray-200 rounded-[16px] animate-pulse" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <XmdCard className="flex gap-[24px] py-4">
        <div className="flex items-center justify-center w-[646px] h-[596px] bg-white/40 rounded-[16px]" style={{ outline: '1px dashed #D0D5DD', outlineOffset: -1 }}>
          <span className="text-[24px] text-muted-text font-pingfang">
            暂无贷款信息
          </span>
        </div>
      </XmdCard>
    );
  }

  return (
    <XmdCard className="flex gap-[24px] py-4 overflow-x-auto hide-scrollbar">
      <div
        className="w-[646px] bg-white rounded-[16px] flex-shrink-0 overflow-hidden shadow-card"
      >
        {/* 标题行 */}
        <div className="pt-[24px] px-[24px] flex items-center justify-between">
          <span
            className="text-[28px] text-black-text font-pingfang font-medium"
          >
            我的贷款
          </span>
          <div className="flex items-center gap-[4px]">
            <span
              className="text-[24px] text-light-gray font-pingfang"
            >
              更多
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#9B9B9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* 还款列表 */}
        <div className="pt-[32px] px-[24px] pb-[24px] flex flex-col gap-[14px]">
          {items.map((item) => (
            <RepaymentItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </XmdCard>
  );
};

export default LoanInfo;