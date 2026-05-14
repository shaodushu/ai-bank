'use client';

import React from 'react';
import { useMetadata } from './MetadataContext';
import XmdCard from './XmdCard';

export interface Manager {
  id: string;
  name: string;
  productName: string;
  productTag: string;
  productTagColor: string;
  productTagTextColor: string;
  unit: string;
  phone: string;
}

interface CustomerManagerProps {
  streamStatus?: 'loading' | 'done';
  'data-key'?: string;
  _metadata?: Record<string, any>;
}

const ManagerCard: React.FC<{ manager: Manager }> = ({ manager }) => {
  return (
    <div
      className="w-[646px] bg-white rounded-[16px] flex-shrink-0 overflow-hidden shadow-card"
    >
      {/* 标题行：产品名称 + 标签 */}
      <div className="pt-[32px] px-[28px]">
        <div className="flex items-center gap-[12px]">
          <span
            className="text-[28px] text-primary-text font-pingfang font-medium"
          >
            {manager.productName}
          </span>
          <div
            className="flex items-center h-[39px] px-[10px] rounded-[4px]"
            style={{ background: manager.productTagColor }}
          >
            <span
              className="text-[22px] font-pingfang"
              style={{ color: manager.productTagTextColor || '#407FFF' }}
            >
              {manager.productTag}
            </span>
          </div>
        </div>
      </div>

      {/* 分隔线 */}
      <div
        className="mt-[16px] mx-[28px] border-t border-black/5"
      />

      {/* 信息区域 */}
      <div className="pt-[16px] px-[28px] pb-[32px]">
        {/* 经理姓名 */}
        <div
          className="text-[36px] text-primary-text font-pingfang font-medium"
        >
          {manager.name}
        </div>

        {/* 单位 */}
        <div className="flex items-start mt-[20px]">
          <span
            className="text-[28px] whitespace-nowrap text-tertiary-text font-pingfang"
          >
            单位：
          </span>
          <span
            className="text-[28px] text-tertiary-text font-pingfang"
          >
            {manager.unit}
          </span>
        </div>

        {/* 手机 */}
        <div className="flex items-start mt-[16px]">
          <span
            className="text-[28px] whitespace-nowrap text-tertiary-text font-pingfang"
          >
            手机：
          </span>
          <span
            className="text-[28px] text-tertiary-text font-pingfang"
          >
            {manager.phone}
          </span>
        </div>
      </div>
    </div>
  );
};

const CustomerManager: React.FC<CustomerManagerProps> = ({ streamStatus, 'data-key': dataKey, _metadata }) => {
  const { metadata: contextMetadata } = useMetadata();
  const metadata = _metadata || contextMetadata;
  const managers: Manager[] = dataKey ? ((metadata[dataKey] as Manager[]) || []) : [];

  if (streamStatus === 'loading' && !managers.length) {
    return (
      <div className="flex gap-[24px] py-4">
        <div className="w-[646px] h-[295px] bg-gray-200 rounded-[16px] animate-pulse" />
        <div className="w-[646px] h-[295px] bg-gray-200 rounded-[16px] animate-pulse" />
      </div>
    );
  }

  if (!managers.length) {
    return (
      <XmdCard className="flex gap-[24px] py-4">
        <div className="flex items-center justify-center w-[646px] h-[295px] bg-white/40 rounded-[16px]" style={{ outline: '1px dashed #D0D5DD', outlineOffset: -1 }}>
          <span className="text-[24px] text-muted-text font-pingfang">
            暂无客户经理数据
          </span>
        </div>
      </XmdCard>
    );
  }

  return (
    <XmdCard className="flex gap-[24px] py-4 overflow-x-auto hide-scrollbar">
      {managers.map((manager) => (
        <div key={manager.id} className="relative">
          <ManagerCard manager={manager} />
        </div>
      ))}
    </XmdCard>
  );
};

export default CustomerManager;
