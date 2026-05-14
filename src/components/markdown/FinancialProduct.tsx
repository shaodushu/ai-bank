'use client';

import React from 'react';
import { useMetadata } from './MetadataContext';
import XmdCard from './XmdCard';

export interface FinancialItem {
  id: string;
  name: string;
  totalAmount: string;
  yesterdayProfit: string;
  yesterdayProfitColor?: string;
  totalProfit: string;
  totalProfitColor?: string;
}

interface FinancialProductProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  _metadata?: Record<string, any>;
}

const FinancialCard: React.FC<{ item: FinancialItem }> = ({ item }) => {
  return (
    <div
      className="w-[646px] bg-white rounded-[16px] flex-shrink-0 overflow-hidden shadow-card"
    >
      {/* 标题行 */}
      <div className="pt-[20px] px-[24px] flex items-center justify-between">
        <span
          className="text-[28px] text-black-text font-pingfang font-medium"
        >
          {item.name}
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

      {/* 内容区域 */}
      <div className="mt-[20px] mx-[24px] mb-[20px] bg-[#F8F8F8] rounded-[8px] p-[24px]">
        <div className="flex justify-between">
          {/* 总金额 */}
          <div>
            <span
              className="text-[24px] text-gray-text font-pingfang"
            >
              总金额
            </span>
            <div className="mt-[8px]">
              <span
                className="text-[32px] text-dark-text font-roboto font-medium"
              >
                {item.totalAmount}
              </span>
            </div>
          </div>

          {/* 昨日收益 */}
          <div>
            <span
              className="text-[24px] text-gray-text font-pingfang"
            >
              昨日收益
            </span>
            <div className="mt-[8px]">
              <span
                className="text-[32px] font-roboto font-medium"
                style={{ color: item.yesterdayProfitColor || '#3EA851' }}
              >
                {item.yesterdayProfit}
              </span>
            </div>
          </div>

          {/* 累计收益 */}
          <div>
            <span
              className="text-[24px] text-gray-text font-pingfang"
            >
              累计收益
            </span>
            <div className="mt-[8px]">
              <span
                className="text-[32px] font-roboto font-medium"
                style={{ color: item.totalProfitColor || '#DF3020' }}
              >
                {item.totalProfit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 兜底 Mock 数据 — 当无 metadata 时用于预览
const FALLBACK_MOCK: FinancialItem[] = [
  {
    id: 'fin_001',
    name: '理财',
    totalAmount: '¥9,525.32',
    yesterdayProfit: '-¥95.32',
    yesterdayProfitColor: '#3EA851',
    totalProfit: '+¥2,534.32',
    totalProfitColor: '#DF3020',
  },
  {
    id: 'fin_002',
    name: '基金',
    totalAmount: '¥15,230.50',
    yesterdayProfit: '+¥230.15',
    yesterdayProfitColor: '#DF3020',
    totalProfit: '+¥3,520.80',
    totalProfitColor: '#DF3020',
  },
  {
    id: 'fin_003',
    name: '定期',
    totalAmount: '¥50,000.00',
    yesterdayProfit: '+¥12.50',
    yesterdayProfitColor: '#DF3020',
    totalProfit: '+¥1,250.00',
    totalProfitColor: '#DF3020',
  },
];

const FinancialProduct: React.FC<FinancialProductProps> = ({ streamStatus, 'data-key': dataKey, _metadata }) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const items: FinancialItem[] = dataKey ? ((metadata[dataKey] as FinancialItem[]) || []) : FALLBACK_MOCK;

  if (streamStatus === 'loading' && !items.length) {
    return (
      <div className="flex gap-[24px] py-4">
        <div className="w-[646px] h-[243px] bg-gray-200 rounded-[16px] animate-pulse" />
        <div className="w-[646px] h-[243px] bg-gray-200 rounded-[16px] animate-pulse" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <XmdCard className="flex gap-[24px] py-4">
        <div className="flex items-center justify-center w-[646px] h-[243px] bg-white/40 rounded-[16px]" style={{ outline: '1px dashed #D0D5DD', outlineOffset: -1 }}>
          <span className="text-[24px] text-muted-text font-pingfang">
            暂无理财数据
          </span>
        </div>
      </XmdCard>
    );
  }

  return (
    <XmdCard className="flex gap-[24px] py-4 overflow-x-auto hide-scrollbar">
      {items.map((item) => (
        <div key={item.id} className="relative">
          <FinancialCard item={item} />
        </div>
      ))}
    </XmdCard>
  );
};

export default FinancialProduct;